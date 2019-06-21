const Twit = require('twit');
const dotenv = require('dotenv');
const sentiment = require('multilang-sentiment');

//const sentiment = new Sentiment();

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

function isRussian(str) {
  const unique = 'бгджзийлптфцчшщъыьэюя';
  if (str.includes(unique)) return true;
  return false;
}

async function getTweets(q, count) {
  let tweets = await api.get('search/tweets', {
    q,
    count,
    tweet_mode: 'extended',
  });
  let data = [];
  return tweets.data.statuses.map(tweet => {
    let score;
    let txt = tweet.retweeted_status
      ? tweet.retweeted_status.full_text
      : tweet.full_text
          .split(/ |\n/)
          .filter(v => !v.startsWith('http'))
          .join(' ');
    if (isRussian(txt) === true) {
      console.log('in russian');
      score = sentiment(txt, 'ru');
    } else {
      score = sentiment(txt, 'en');
    }
    console.log('inside gettweets', txt, 'score', score);
    data.push(score.score);
    // // data.push(score);
    console.log(data);
    // let score = sentiment.analyze(data);
    // console.dir(score);
  });
}

// async function main() {
//   let keyword = 'USDRUB';
//   let count = 10;
//   try {
//     let tweets = await getTweets(keyword, count);
//     for (let i = 0; i < tweets.length; i++) {
//       let tweet = tweets[i];
//       let score = sentiment.analyze(tweet);
//       tweet = `${tweet}\n`;
//       if (score > 0) {
//         tweet = colors.green(tweet);
//       } else if (score < 0) {
//         tweet = colors.red(tweet);
//       } else {
//         tweet = colors.blue(tweet);
//       }
//       console.log(tweet);
//     }
//   } catch (error) {
//     console.log('fuck this shit');
//   }
// }

// main();
// async function main() {
//   try {
//     let result = await getTweets('USDRUB', 300);
//     //console.log(result);
//     for (let i = 0; i < result.length; i++) {
//       let tweet = result[i];
//       let score = sentiment.analyze(tweet, 'ru');
//       console.dir(score);
//     }
//   } catch (err) {
//     console.log('fuck it');
//   }
// }
// function analysis() {
//   let array = getTweets('usdrub', 20);
//     let result;
//     if (score.score > 0) {
//       result = colors.green(score.score);
//     } else if (score.score < 0) {
//       result = colors.red(score.score);
//     } else {
//       result = colors.blue(score.score);
//     }
//     console.log('score is: ', score);
//   }
// }

// analysis();

let str = `Рубль берет паузу после мощного прыжка /  / Российская валюта пережила в четверг самое сильное ралли с начала года. USDRUB потеряла 89 копеек, или 1.4%. Однако если в январе рост курса рубля объяснялся восстановлением после предновогоднего провала, то .. https://t.co/RnRc2M7RWB`;

getTweets('usdrub', 5);

// let score = sentiment(str, 'ru');
// console.dir(score);
