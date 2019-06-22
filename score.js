const Sequelize = require('sequelize');
const db = require('./db.js');

const Score = db.define('score', {
  timestamp: {
    type: Sequelize.DATE,
  },
  score: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Score;
