import { consume } from '../queue/rabbitmq.js';
import { crawlers } from '../crawlers/index.js';

export function startWorker() {
    consume(async (message) => {
        console.log('Mensagem recebida:', message);

        const crawler = crawlers[message.crawler];

        if (!crawler) {
            console.log(`Crawler "${message.crawler}" não encontrado.`);
            return;
        }

        await crawler();
    });
}