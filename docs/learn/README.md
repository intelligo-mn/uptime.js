---
sidebar: auto
type: guide
---


## Introduction

Uptime monitor in Node.js that send status changes to Chatbots. 

[![NPM](https://nodei.co/npm/uptime.js.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/uptime.js/)

### Version

This project is currently at `version 1.0.2`.

## Getting Started

### Prerequisites

- [NodeJS >= 8](https://nodejs.org/)
- Basic knowledge of navigating the terminal

## Installation

```
npm install uptime.js --save
```

## Usage

```js
'use strict';

const express  = require('express'),
      Uptime   = require('uptime.js');

const app = express();

app.set('port', process.env.PORT || 5000);

const bot = new Uptime({
  SLACK_WEBHOOK_URL: 'SLACK_WEBHOOK_URL'
});

bot.monitor([
  {
    url: 'https://www.intelligo.systems', // URL of service we'll be pining
    timeout: 200 // threshold in milliseconds above which is considered degraded performance
  }
]);

app.listen(app.get('port'), () => {
    console.log('Express is listening on port', app.get('port'));
});

```

## Setting up Slack

Head on over to the Incoming WebHooks Slack app. If you're signed in to your Slack Workspace you should see an Add Configuration button. Hit it!

![screenshot](https://raw.githubusercontent.com/intelligo-systems/uptime.js/master/.github/image1.png)

Select or create a new channel then hit the Add Incoming WebHooks integration

![screenshot](https://raw.githubusercontent.com/intelligo-systems/uptime.js/master/.github/image2.png)

Grab the WebHook URL and paste it into the `SLACK_WEBHOOK_URL`, which would look like so:

`SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXXXXX/YYYYYY/XXXXXXXXXXXX`

![screenshot](https://raw.githubusercontent.com/intelligo-systems/uptime.js/master/.github/image3.png)

You can update 

```js
bot.monitor([
  {
    url: 'https://www.intelligo.systems', // URL of service we'll be pining
    timeout: 200 // threshold in milliseconds above which is considered degraded performance
  }
]);
``` 
with the services you wish to monitor and throw the code up on a server.

![screenshot](https://raw.githubusercontent.com/intelligo-systems/uptime.js/master/.github/image4.png)

## Contributors

You may contribute in several ways like creating new features, fixing bugs, improving documentation and examples
or translating any document here to your language. [Find more information in CODE_OF_CONDUCT.md](https://raw.githubusercontent.com/intelligo-systems/uptime.js/master/.github/CODE_OF_CONDUCT.md).
<a href="https://github.com/intelligo-systems/uptime.js/graphs/contributors">Contributors</a>

## License

> Copyright (C) 2019 Intelligo Systems.  
> uptime.js is open-sourced software licensed under the [MIT](https://opensource.org/licenses/MIT) license.  
> (See the [LICENSE](https://github.com/intelligo-systems/uptime.js/blob/master/LICENSE) file for the whole license text.)

