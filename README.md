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
const website = require('./websites'),
      Uptime  = require('techstar-uptime');
      
const uptime = new Uptime({
  SLACK_WEBHOOK_URL: 'SLACK_WEBHOOK_URL'
});
uptime.monitor(website);

app.use('/uptime', uptime);
```

# Setting up Slack

Head on over to the Incoming WebHooks Slack app. If you're signed in to your Slack Workspace you should see an Add Configuration button. Hit it!

![screenshot](https://github.com/techstar-cloud/techstar-uptime/blob/master/public/img/image1.png)

Select or create a new channel then hit the Add Incoming WebHooks integration
![screenshot](https://github.com/techstar-cloud/techstar-uptime/blob/master/public/img/image2.png)

Grab the WebHook URL and paste it into the `SLACK_WEBHOOK_URL`, which would look like so:
`SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXX/YYYYYY/XXXXXXXXXXXX`
![screenshot](https://github.com/techstar-cloud/techstar-uptime/blob/master/public/img/image3.png)

You can update `websites.js` with the services you wish to monitor and throw the code up on a server.
![screenshot](https://github.com/techstar-cloud/techstar-uptime/blob/master/public/img/image4.png)

## Contributors

You may contribute in several ways like creating new features, fixing bugs, improving documentation and examples
or translating any document here to your language. [Find more information in CONTRIBUTING.md](CONTRIBUTING.md).
<a href="https://github.com/techstar-cloud/techstar-uptime/graphs/contributors">Contributors</a>

## License

Techstar uptime is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
