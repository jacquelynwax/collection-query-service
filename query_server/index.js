const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const cluster = require('cluster');

const db = require('../db');

const PORT = process.env.PORT || 8080;

const app = express();
module.exports = app;

const createApp = () => {
  // logging middleware
  app.use(morgan('dev'));

  // body parsing middleware
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // compression middleware
  app.use(compression());

  // api router
  app.use('/api', require('./api'));

  // static file serving middleware
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // send index html
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'));
  })

  // error handling middleware
  app.use((req, res, next, err) => {
    console.log(err);
    console.log(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal service error.');
  })
}

const startListening = () => {
  app.listen(PORT, () => console.log(`Mixing it up for the NYT on port ${PORT}`));
}

const syncDb = () => {
  console.log('Syncing the database');
  db.sync({ force: true });
}

if (cluster.isMaster) {
  // count cpus
  const cpus = require('os').cpus().length;

  // create a worker for each cpu
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  // this code will run if we're in a worker process, for each worker process
  createApp();
  startListening();
  syncDb();
}





































//
