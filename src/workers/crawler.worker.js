import { consume } from '../queue/rabbitmq.js';
import { execute } from '../crawlers/transparencia-ms/crawler.js';

export function startWorker() {
    consume(async (message) => {
        console.log('Mensagem recebida:', message);

        switch (message.crawler) {
            case 'transparencia-ms':
                await execute();
                break;

            default:
                console.log('Crawler não encontrado.');
        }
    });
}