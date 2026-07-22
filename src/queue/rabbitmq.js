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
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
    );
}

export function consume(callback) {
    channel.consume(QUEUE, async (message) => {
        if (!message) return;

        try {
            const content = JSON.parse(message.content.toString());

            await callback(content);

            channel.ack(message);
        } catch (error) {
            console.error(error);

            channel.nack(message, false, true);
        }
    });
}