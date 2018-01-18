'use strict';

const EventEmitter = require('eventemitter3'),
      request  = require('request');

class Uptime extends EventEmitter{
   
    constructor(options) {
        super();
        if (!options || (options && (!options.SLACK_WEBHOOK_URL))) {
          throw new Error("You need to specify an SLACK_WEBHOOK_URL");
        }
        this.SLACK_WEBHOOK_URL = options.SLACK_WEBHOOK_URL;
        this.pingInterval = 1*1000*60
        this.serviceStatus = {}
    }
 
    pingService(url, cb){
      
      console.log("PING START");
      request({
        method: 'GET',
        uri: url,
        time: true
      }, (err, res, body) => {
        if (!err && res.statusCode == 200) {
          // we'll use the time from the point we try to establish a connection with
          // the service until the first byte is received
          cb(res.timingPhases.firstByte)
        } else {
          cb('OUTAGE')
        }
      })
    }
        
    postToSlack(serviceUrl){
      
      console.log("POST TO SLACK START");
      var message = "";
      if (this.serviceStatus[serviceUrl].status == 'DEGRADED'){
          message = "`СИСТЕМИЙН АЖИЛЛАГАА УНАСАН !!!` :skull: ";
      } else if (this.serviceStatus[serviceUrl].status == 'OPERATIONAL') {
         message = "СИСТЕМИЙН АЖИЛЛАГАА ХЭВИЙН БАЙНА :robot_face:";
      } else if (this.serviceStatus[serviceUrl].status == 'OUTAGE') {
         message = "СИСТЕМИЙН АЖИЛЛАГАА ДОГОЛДЛОО :zzz:";
      }
      let slackPayload = {
        text: `*${message}*\n_${serviceUrl}_`
      }
    
      request({
        method: 'POST',
        uri: this.SLACK_WEBHOOK_URL,
        body: slackPayload,
        json: true
      }, (err, res, body) => {
        if (err) console.log(`Error posting to Slack: ${err}`)
      })
    }
    
    monitor(websites){
        console.log("MONITOR START");
        websites.forEach(service => {
          this.serviceStatus[service.url] = {
            status: 'OPERATIONAL', // initialize all services as operational when we start
            responseTimes: [], // array containing the responses times for last 3 pings
            timeout: service.timeout // load up the timout from the config
          }
        
          setInterval(() => {
            this.pingService(service.url, (serviceResponse) => {
              if (serviceResponse === 'OUTAGE' && this.serviceStatus[service.url].status !== 'OUTAGE') {
                // only update and post to Slack on state change
                this.serviceStatus[service.url].status = 'OUTAGE'
                this.postToSlack(service.url)
              } else {
                let responseTimes = this.serviceStatus[service.url].responseTimes
                responseTimes.push(serviceResponse)
        
                // check degraded performance if we have 3 responses so we can average them
                if (responseTimes.length > 3) {
                  // remove the oldest response time (beginning of array)
                  responseTimes.shift()
        
                  // compute average of last 3 response times
                  let avgResTime = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
                  let currService = this.serviceStatus[service.url]
        
                  if (avgResTime > currService.timeout && currService.status !== 'DEGRADED') {
                    currService.status = 'DEGRADED'
                    this.postToSlack(service.url)
                  } else if (avgResTime < currService.timeout && currService.status !== 'OPERATIONAL') {
                    currService.status = 'OPERATIONAL'
                    this.ostToSlack(service.url)
                  }
                }
        
              }
            })
          }, this.pingInterval)
        })
    }
}

module.exports = Uptime;