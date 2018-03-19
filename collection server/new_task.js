// this module schedules tasks to our work queue

// require library
const amqp = require('amqplib/callback_api');

// connect to RabbitMQ server
amqp.connect('amqp://localhost', (err, conn) => {
  // create a channel, where most of the API for getting things done resides
  conn.createChannel((err, ch) => {
    // declare a queue; this process is idempotent - the queue will only be created if it doesn't exist already.
    let q = 'task_queue';
    let msg = [{
      responseType: 'something',
      responseTime: 15
    }];

    ch.assertQueue(q, { durable: true });
    ch.sendToQueue(q, Buffer.from(JSON.stringify(msg)), { persistent: true }); /* ensures our messages won't be lost */
    console.log(" [x] sent '%s'", msg);
  });
  // close the connection and exit
  setTimeout(() => {
    conn.close();
    process.exit(0)
  }, 500);
});
