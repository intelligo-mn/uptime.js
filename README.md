# Node uptime bot

[![npm](https://img.shields.io/npm/v/techstar-uptime.svg?style=plastic)](https://www.npmjs.com/package/techstar-uptime)
[![npm](https://img.shields.io/npm/dt/techstar-uptime.svg?style=plastic)](https://www.npmjs.com/package/techstar-uptime)
[![GitHub license](https://img.shields.io/github/license/techstar-cloud/intelligo.svg)](https://github.com/techstar-cloud/techstar-uptime/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/techstar-cloud/techstar-uptime.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fgithub.com%2Ftechstar-cloud%2Fintelligo)

Uptime monitor in Node.js that send status changes to Slack

[![NPM](https://nodei.co/npm/techstar-uptime.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/techstar-uptime/)


| [Installation][] | [Usage][] | [Setting up Slack][] | [Contributors][] | [License][] |
|---|---|---|---|---|

# Installation

```
npm install techstar-uptime --save
```

# Usage

```js
'use strict';

const express  = require('express'),
      Uptime   = require('techstar-uptime');

const app = express();

app.set('port', process.env.PORT || 5000);

const bot = new Uptime({
  SLACK_WEBHOOK_URL: 'SLACK_WEBHOOK_URL'
});

bot.monitor([
  {
    url: 'https://www.techstar.cloud', // URL of service we'll be pining
    timeout: 200 // threshold in milliseconds above which is considered degraded performance
  }
]);

app.listen(app.get('port'), () => {
    console.log('Express is listening on port', app.get('port'));
});

```

# Setting up Slack

Head on over to the Incoming WebHooks Slack app. If you're signed in to your Slack Workspace you should see an Add Configuration button. Hit it!

![screenshot](https://raw.githubusercontent.com/techstar-cloud/techstar-uptime/master/public/img/image1.png)

Select or create a new channel then hit the Add Incoming WebHooks integration

![screenshot](https://raw.githubusercontent.com/techstar-cloud/techstar-uptime/master/public/img/image2.png)

Grab the WebHook URL and paste it into the `SLACK_WEBHOOK_URL`, which would look like so:

`SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXX/YYYYYY/XXXXXXXXXXXX`

![screenshot](https://raw.githubusercontent.com/techstar-cloud/techstar-uptime/master/public/img/image3.png)

You can update 

```js
bot.monitor([
  {
    url: 'https://www.techstar.cloud', // URL of service we'll be pining
    timeout: 200 // threshold in milliseconds above which is considered degraded performance
  }
]);
``` 
with the services you wish to monitor and throw the code up on a server.

![screenshot](https://raw.githubusercontent.com/techstar-cloud/techstar-uptime/master/public/img/image4.png)

## Contributors

You may contribute in several ways like creating new features, fixing bugs, improving documentation and examples
or translating any document here to your language. [Find more information in CONTRIBUTING.md](CONTRIBUTING.md).
<a href="https://github.com/techstar-cloud/techstar-uptime/graphs/contributors">Contributors</a>

## License

[MIT](LICENSE).


**[⬆ back to top](#node-uptime-bot)**

[Installation]:#installation
[Usage]:#usage
[Setting up Slack]:#setting-up-slack
[Contributors]:#contributors
[License]:#license

