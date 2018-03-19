const router = require('express').Router();
const { Message } = require('../../db/models');

module.exports = router;

// get chosen stat for a chosen responseType for a chosen time period
router.get('/:response_type/:stat/:date/:hour', (req, res, next) => {
  // find all messages of the fiven response type and within the given data and hour
  // return to the promise chain and then implement class method based on given stat
  Message.findAll({
    where: {
      // fill in date info once I look at Postico
      responseType: req.params.repsonse_type
    }
  })
  .then(messages => {
    let method = req.params.stat;
    return Message.method(messages);
  })
  .then(messages => {
    res.json(messages);
  })
  .catch(next);
})
