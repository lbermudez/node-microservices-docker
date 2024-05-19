/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
const amqp = require("amqplib");
const OrderService = require('./OrderService'); 
    

const connect = async (connectionString, retryOptions) => {
    // eslint-disable-next-line prefer-const
    let {retries, maxRetries, retryTime} = retryOptions;
    let connection = null;
    while (retries < maxRetries) {
        try {
            console.log('trying connection to', connectionString);
            connection = await amqp.connect(connectionString);
            return connection;
        } catch (error) {
            console.error(error);
            retries++;
            if (retries >= maxRetries) {
                throw new Error('Max retries reached');
            }
            console.log(`Waiting to retry connection...`);
            const start = Date.now();
            await new Promise(resolve => setTimeout(resolve, retryTime || 3000));
            console.log(`Retrying connection after ${Date.now() - start}... (Attempt ${retries} of ${maxRetries})`);
        }
    }
    return connection;
}

const connectToRabbitMQ = async (connectionString, queue, retryOptions) => {
    const connection = await connect(connectionString, retryOptions);

    try {
        const channel = await connection.createChannel();
        
        await channel.assertQueue(queue, { durable: true });
        console.log(" [x] Waiting for messages in %s.", queue);

        channel.consume(
            queue,
            async (message) => {
            const order = JSON.parse(message.content.toString());
            console.log(" [x] Received %s", JSON.stringify(order));
            await OrderService.create(order.userId, order.email, order.items);
            channel.ack(message);
            },
            { noAck: false }
        );
    } catch (error) {
        console.error(error);
    }
    
}

module.exports = {connectToRabbitMQ, connect};
