const Twit = require('twit');
const dotenv = require('dotenv');
const Sentiment = require('sentiment');
const colors = require('colors/safe');

const sentiment = new Sentiment();

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

// function get_text(tweet) {
//   let txt = tweet.retweeted_status
//     ? tweet.retweeted_status.full_text
//     : tweet.full_text;
//   return txt
//     .split(/ |\n/)
//     .filter(v => !v.startsWith('http'))
//     .join(' ');
// }

async function getTweets(q, count) {
  let tweets = await api.get('search/tweets', {
    q,
    count,
    tweet_mode: 'extended',
  });
  let data = [];
  return tweets.data.statuses.map(tweet => {
    let txt = tweet.retweeted_status
      ? tweet.retweeted_status.full_text
      : tweet.full_text
          .split(/ |\n/)
          .filter(v => !v.startsWith('http'))
          .join(' ');
    data.push(txt);
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
function analysis() {
  let array = getTweets('usdrub', 2);
  console.log(array);
  for (let i = 0; i < array.length; i++) {
    console.log('here');
    let score = sentiment.analyze(array[i]);
    console.log('now here');
    // let result;
    // if (score.score > 0) {
    //   result = colors.green(score.score);
    // } else if (score.score < 0) {
    //   result = colors.red(score.score);
    // } else {
    //   result = colors.blue(score.score);
    // }
    console.log('score is: ', score);
  }
}

analysis();
// let array = [
//   'Un Gryffindor proponiéndole matrimonio a una Slytherin en el parque temático de Harry Potter ⚡️ https://t.co/6bRJj7eMcB',
//   "I kinda just geeked out for the Harry Potter game that just came out that's sort of like Pokemon Go",
//   "Let's be Friends in Harry Potter: Wizards Unite! My Friend Code is: 0268 2864 8786. #HarryPotterWizardsUnite",
//   '@NianticHelp @NianticLabs I know y’all are busy with Harry Potter but if you could find sometime to discuss making shiny Pokémon keeping(&gt;80%IV) it would be awesome. Every shiny I’ve ever caught including on CD the IV is always trash. @trnrtips @PkmnMasterHolly @_ZoeTwoDots',
//   'Mia figlia (la più piccola)dice che Tra le bacchette magiche quella di Harry Potter è la più potente,ecco vorrei regalarla a Virginia Raggi perché faccia tornare muti tutti quelli che oggi vogliono tutto e subito,ma per trent’anni non hanno mai criticato i Sindaci del passato.',
//   'They’ve been developing the Harry Potter game for 3 years and the roll out got ruined bc they put it out the same day a rapper put out a song about a sandwich',
//   "Let's be Friends in Harry Potter: Wizards Unite! My Friend Code is: 3450 1336 4797.",
//   '20 June 1992: Harry Potter completes his first year at Hogwarts School of Witchcraft and Wizardry. https://t.co/7KElelYGpH',
//   '🎯 El apartamento de Harry Potter que tus ojos muggles podrán ver',
//   "Q&amp;A: Jefferson Turner &amp; Daniel Clarkson of @PottedPotter\n'Potted Potter: The Unauthorized Harry Experience' currently stars the original creators in Las Vegas through June 23! Read on for ALL the exclusive details 🧙‍♂️✨» https://t.co/9XR00POo3v \n@ActorJeff @Daniel_Veronica https://t.co/2fvuqaH1W9",
//   "Let's be Friends in Harry Potter: Wizards Unite! My Friend Code is: 5236 8455 9142.",
//   "Let's be Friends in Harry Potter: Wizards Unite! My Friend Code is: 8555 6080 3085.",
//   'The worldwide launch of Harry Potter: Wizards Unite begins this Friday, June 21! Keep your eyes peeled and wand ready for more information as the game goes live in your region soon. #WizardsUnite https://t.co/ckk4s4mi8a',
//   "\"'I am not worried, Harry,' said Dumbledore, his voice a little stronger despite the freezing water. 'I am with you.'”\n- Harry Potter and the Half-Blood Prince #PotterQuotes https://t.co/h7FPmpzzPm",
//   "Let's be Friends in Harry Potter: Wizards Unite! My Friend Code is: 3111 9192 2033.",
//   "Let's be Friends in Harry Potter: Wizards Unite! My Friend Code is: 8397 5687 4615.",
//   '@ComfortablySmug @michaeljknowles I say he looks more like Voldemort from Harry Potter. I think the Golden Trio grew up to be Trump supporters.',
//   "Let's be Friends in Harry Potter: Wizards Unite! My Friend Code is: 2958 5111 5029.",
//   'Un Gryffindor proponiéndole matrimonio a una Slytherin en el parque temático de Harry Potter ⚡️ https://t.co/6bRJj7eMcB',
//   '@GrandisAyuning wkwk apaan nonton mas harry potter, mas harry potternya yang nonton buna tidur kali😂',
//   'trajados na baixa: \nestrangeiros: uhhh Harry Potter. Picture! Why are you dressed like that????',
//   'Harry Potter y el misterio de porqué mierda dejo todo a último momento si sé que no funciono bajo presión.',
//   'Unpopular Opinion: Percy Jackson had so much potential. It was supposed to be a Harry Potter caliber film franchise. I wish Riordan had more control over the movie https://t.co/0iowxjOJwC',
//   'Harry Potter pq tão bom??',
//   'successfully managed to extend their franchises while leaving their most famous characters behind, most famously J.K. Rowling, who has extended the universe of “Harry Potter” with spinoffs set in the same world.',
//   '¡Seamos amigos en #Harry #Potter: #Wizards #Unite! Mi código de amigo es: 6127 4754 2677.',
//   'A modern workplace. You’ve found a modern workplace. I thought these people were supposed to have had successful careers in business. They’re responding to simple bits of office equipment like it’s the Cloak of Invisibility from Harry Potter https://t.co/1KYJ5BJp2P',
//   'Unpopular Opinion: Percy Jackson had so much potential. It was supposed to be a Harry Potter caliber film franchise. I wish Riordan had more control over the movie https://t.co/0iowxjOJwC',
// ];
