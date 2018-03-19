// require library
const amqp = require('amqplib/callback_api');

// open connection to RabbitMQ server, create a channel, declare a queue from which we're going to consume (matches with the queue that sendToQueue in send.js publishes to)
amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    // Because we might start the consumer before the publisher, we want to make sure the queue exists before we try to consume messages from it, so we declare it here as well
    let q = 'test';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C.", q);
    ch.consume(q, (msg) => {
      console.log(" [x] Received %s", msg.content.toString());
    }, {noAck: true});

  });
});
