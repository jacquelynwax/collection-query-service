/*
*
This module instantiates a worker process that 1) pops messages from the queue via AMQP and 2) makes a write request to our postgreSQL database using Sequelize.
*
*/

const amqp = require('amqplib/callback_api'); // require the amqp library

const { Message } = require('../../db/models'); // require our Message model

amqp.connect('amqp://localhost', (err, conn) => { // open connection to RabbitMQ server
  conn.createChannel((err, ch) => { // create a channel
    let q = 'task_queue';

    ch.assertQueue(q, {durable: true}); // declare a queue -- should match queue declared in new_task.js, and give it the option durable: true to ensure RabbitMQ will never lose it
    ch.prefetch(1); // tell RabbitMQ not to dispatch a new message to a worker until it has processed and acknowledged the previous one (instead of using round robin)
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, (msg) => {
      let secs = msg.content.toString().split('.').length - 1;
      let parsedMsg = JSON.parse(msg.content)[0];
      console.log(" [x] Received %s", parsedMsg);

      // write to the database using helper function defined below

      let responseType = parsedMsg.responseType;
      let responseTime = parsedMsg.responseTime;
      console.log(responseType, responseTime);
      writeToDB(responseType, responseTime);

      setTimeout(function() {
        console.log(" [x] Done");
        ch.ack(msg);
      }, secs * 1000);
    }, {noAck: false}); /* If a consumer dies (its channel is closed, connection is closed, or TCP connection is lost) without sending an ack, RabbitMQ will understand that a message wasn't processed fully and will re-queue it. If there are other consumers online at the same time, it will then quickly redeliver it to another consumer. That way you can be sure that no message is lost, even if the workers occasionally die. */
  });
});

const writeToDB = (responseType, responseTime) => {
  return Message.create({ responseType, responseTime });
};
