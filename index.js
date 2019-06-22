const Twit = require('twit');
const dotenv = require('dotenv');
const sentiment = require('multilang-sentiment');
const franc = require('franc');
//const Score = require('./score.js');

dotenv.config();

const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
} = process.env;

const config_twitter = {
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
};

let api = new Twit(config_twitter);

let dataset = [];

async function getTweets(q, count) {
  let tweets = await api.get('search/tweets', {
    q,
    count,
    tweet_mode: 'extended',
  });

  return tweets.data.statuses.map(tweet => {
    let score;
    let txt = tweet.retweeted_status
      ? tweet.retweeted_status.full_text
      : tweet.full_text
          .split(/ |\n/)
          .filter(v => !v.startsWith('http'))
          .join(' ');
    console.log('text', txt, 'score', score);
    if (franc(txt) === 'rus') score = sentiment(txt, 'ru');
    else score = sentiment(txt, 'en');
    dataset.push(score.score);
  });
}

getTweets('fullstack', 5);

d3.select('body')
  .selectAll('p')
  .data(dataset)
  .enter()
  .append('p')
  .text(`i'm tired`);
