const router = require('express').Router();
module.exports = router;

router.use('/queries', require('./queries'))

router.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
})
