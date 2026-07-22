import amqp from 'amqplib';

const QUEUE = 'crawler';

let channel;

export async function connectRabbitMQ() {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);

    channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, {
        durable: true
    });
}

export function publish(message) {
    channel.sendToQueue(
        QUEUE,
        Buffer.from(JSON.stringify(message))
    );
}

export { QUEUE, channel };