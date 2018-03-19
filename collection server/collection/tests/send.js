// require library
const amqp = require('amqplib/callback_api');

// connect to RabbitMQ server
amqp.connect('amqp://localhost', (err, conn) => {
  // create a channel, where most of the API for getting things done resides
  conn.createChannel((err, ch) => {
    // declare a queue; this process is idempotent - the queue will only be created if it doesn't exist already.
    let q = 'test';

    ch.assertQueue(q, { durable: false });
    ch.sendToQueue(q, Buffer.from('Hello word!'));
    console.log(" [x] sent 'Hello World!'");
  });
  // close the connection and exit
  setTimeout(() => {
    conn.close();
    process.exit(0)
  }, 500);
});
