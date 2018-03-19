const Sequelize = require('sequelize');
const db = require('../db.js');

const Message = db.define('message', {
  responseType: {
    type: Sequelize.STRING,
    allowNull: false
  },
  responseTime: {
    type: Sequelize.INTEGER
  }
});

Message.average = function(messages) {
  let sum = 0;
  messages.forEach(message => {
    sum += message.responseTime;
  })
  return sum / messages.length;
};

Message.median = function(messages) {
  messages.sort();
  return messages(Math.floor(messages.length / 2)).responseTime;
};

Message.min = function(messages) {
  messages.sort();
  return messages[0].responseTime;
};

Message.max = function(messages) {
  messages.sort();
  return messages[messages.length - 1].responseTime;
};

module.exports = Message;
