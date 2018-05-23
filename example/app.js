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