const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');
const { request } = require('http');git a

// const response = require('express');

const app = express();

app.locals.siteName = 'ROUX Academy';



app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Ghdur687399s7w', 'hhjjdf89s866799'],
  })
);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'ROUX Meetups';

app.use(express.static(path.join(__dirname, './static')));




// eslint-disable-next-line consistent-return
app.use(async (request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakerNames = names;
  
    return next();
  // eslint-disable-next-line no-empty
  } catch (error) {
      
  }
});

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port!`, port);
});
