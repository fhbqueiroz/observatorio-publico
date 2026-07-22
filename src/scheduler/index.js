import cron from 'node-cron';

import { publish } from '../queue/rabbitmq.js';

export function startScheduler() {
    cron.schedule('* * * * *', async () => {
        console.log(`[${new Date().toISOString()}] Executando scheduler...`);

        try {
            publish({
                crawler: 'transparencia-ms',
                createdAt: new Date().toISOString()
            });

            console.log('Mensagem enviada.');
        } catch (error) {
            console.error(error);
        }
    });
}