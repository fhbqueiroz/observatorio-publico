import cron from 'node-cron';

import { publish } from '../queue/rabbitmq.js';
import * as logger from '../shared/logger.js';

export function startScheduler() {
    cron.schedule('* * * * *', async () => {
        logger.info(`[${new Date().toISOString()}] Executando scheduler...`);

        try {
            publish({
                crawler: 'transparencia-ms',
                createdAt: new Date().toISOString()
            });

            logger.info('Mensagem enviada.');
        } catch (error) {
            logger.error(error);
        }
    });
}