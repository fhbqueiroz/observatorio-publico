import cron from 'node-cron';
import { execute } from '../crawlers/transparencia-ms/crawler.js';

export function startScheduler() {
    cron.schedule('* * * * *', async () => {
        console.log(`[${new Date().toISOString()}] Executando crawler...`);

        try {
            await execute();
        } catch (error) {
            console.error(error);
        }
    });
}