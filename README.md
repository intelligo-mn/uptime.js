# Node uptime bot

Uptime monitor in Node.js that posts status changes to Slack

[![NPM](https://nodei.co/npm/techstar-uptime.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/techstar-uptime/)

# Installation

```
npm install techstar-uptime --save
```

# Usage

Create the `websites.js` file and specify some services we wish to monitor.

```js
module.exports = [
  {
    url: 'https://www.google.com', // URL of service we'll be pining
    timeout: 200 // threshold in milliseconds above which is considered degraded performance
  },{
    url: 'https://www.github.com',
    timeout: 200 
  },
]
```

```js
const express = require( 'express'),
      config  = require('config'),
      website = require('./websites'),
      Uptime  = require('techstar-uptime');

const app = express();

const uptime = new Uptime({
  SLACK_WEBHOOK_URL: config.get('SLACK_WEBHOOK_URL')
});
uptime.monitor(website);

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Server is running on port', app.get('port'));
});

```
