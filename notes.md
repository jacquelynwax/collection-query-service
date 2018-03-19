Info on starting rabbitMQ server
https://stackoverflow.com/questions/23050120/rabbitmq-command-doesnt-exist

Info on RabbitMQ and Node
https://www.ctl.io/developers/blog/post/tutorial-rabbitmq-node-js
https://kimambo.de/a-better-way-to-work-with-rabbitmq-and-nodejs/
https://facundoolano.wordpress.com/2016/06/26/real-world-rpc-with-rabbitmq-and-node-js/
https://github.com/murnax/rabbitmq-with-expressjs

The message producer (client) sends a message to the message broker via AMPQ protocol. The worker pulls this message off the queue and hits our Express router. This router then makes a post request to the database using the data sent in the message, namely response-type and response-time.
