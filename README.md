#Social media sentiment analysis project#

This app uses Twitter API to fetch data for a given search word, writes the tweets into a CSV file, performs sentiment analysis on the tweets with multilang-sentiment (configured to Russian and English only, other languages in progress), and then creates a simple data series chart in D3.js

#To perform the analysis:

  run npm install
  enter the search word and the desired number of tweet in index.js
  run node index.js in your terminal and run live server - your timeseries chart will be dispayed in the local host window
