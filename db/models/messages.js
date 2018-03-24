const Sequelize = require('sequelize');
const db = require('../db.js');

const Message = db.define('message', {
  responseType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  responseTime: {
    type: Sequelize.INTEGER
  },
  date: {
    type: Sequelize.STRING
  },
  hour: {
    type: Sequelize.INTEGER
  }
});

module.exports = Message;
