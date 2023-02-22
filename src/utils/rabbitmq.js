var amqp = require('amqplib/callback_api');

export const sender=(data) => {
    amqp.connect('amqp://localhost', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
    
            var queue = 'register';
            var msg = data;
    
            channel.assertQueue(queue, {
                durable: false
            });
            channel.sendToQueue(queue, Buffer.from(msg));
    
            console.log(` message sending: ${msg} `);

        });
    
    });
}

const receiver=() => {
    amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'register';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" waiting for message", queue);

        channel.consume(queue, function(msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});
}

receiver();