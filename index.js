const Twit = require('twit');
const dotenv = require('dotenv');
const sentiment = require('multilang-sentiment');
const franc = require('franc');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

dotenv.config();

const {
  CONSUMER_KEY,
  CONSUMER_SECRET,
  ACCESS_TOKEN,
  ACCESS_TOKEN_SECRET,
} = process.env;

// Twitter API config
const config_twitter = {
  consumer_key: CONSUMER_KEY,
  consumer_secret: CONSUMER_SECRET,
  access_token: ACCESS_TOKEN,
  access_token_secret: ACCESS_TOKEN_SECRET,
  timeout_ms: 60 * 1000,
};

let api = new Twit(config_twitter);

let data = [];

// csv file config
const csvWriter = createCsvWriter({
  path: 'data.csv',
  header: [
    { id: 'datetime', title: 'datetime' },
    { id: 'location', title: 'location' },
    { id: 'score', title: 'score' },
    { id: 'words', title: 'words' },
    { id: 'txt', title: 'txt' },
  ],
});

// fetching the data from the API
async function getTweets(q, count) {
  try {
    let tweets = await api.get('search/tweets', {
      q,
      count,
      tweet_mode: 'extended',
    });

    // stardardizing the data
    tweets.data.statuses.map(tweet => {
      let score,
        datetime = tweet.created_at,
        location = tweet.retweeted_status
          ? tweet.retweeted_status.user.location.replace(`''`, '')
          : tweet.user.location.replace(`''`, ''),
        txt = tweet.retweeted_status
          ? tweet.retweeted_status.full_text
          : tweet.full_text
              .split(/ |\n/)
              .filter(v => !v.startsWith('http'))
              .join(' ');

      // checking the language, performing the sentiment analysis
      if (franc(txt) === 'rus') score = sentiment(txt, 'ru');
      else score = sentiment(txt, 'en');
      data.push({
        datetime: `${datetime}`,
        location: `${location}`,
        score: `${score.score}`,
        words: `${score.words}`,
        txt: `${txt}`,
      });
      return data;
    });

    // writing the data into csv
    csvWriter
      .writeRecords(data)
      .then(() => console.log('The CSV file was written successfully'));
  } catch (error) {
    console.log('oy vey');
  }
}

/* The first parameter is the user-specified keyword, the second parameter is
the nujmber of requested tweets. The free access limit is 36 tweets.
*/
getTweets('hong kong', 30);
