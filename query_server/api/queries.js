const router = require('express').Router();
const { Message } = require('../../db/models');
const { stats} = require('../utils');

module.exports = router;

// get chosen stat for a chosen responseType for a chosen date and time
router.get('/:response_type/:stat/:date/:hour', (req, res, next) => {
  Message.findAll({
    where: {
      responseType: req.params.response_type,
      date: req.params.date,
      hour: req.params.hour
    }
  })
  .then(messages => {
    if (messages.length) {
      let method = req.params.stat;
      return stats[method](messages);
    } else {
      return null;
    }
  })
  .then(stat => {
    stat !== null ? res.json(stat) : res.json('No messages found for the requested date and time.');
  })
  .catch(next);
})
