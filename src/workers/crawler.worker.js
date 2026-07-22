import { consume } from '../queue/rabbitmq.js';
import { crawlers } from '../crawlers/index.js';
import * as logger from '../shared/logger.js';

export function startWorker() {
    consume(async (message) => {
        logger.info('Mensagem recebida:', message);

        const crawler = crawlers[message.crawler];

        if (!crawler) {
            logger.info(`Crawler "${message.crawler}" não encontrado.`);
            return;
        }

        await crawler();
    });
}