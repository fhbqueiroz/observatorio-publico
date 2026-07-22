import 'dotenv/config';

import { connectRabbitMQ } from './queue/rabbitmq.js';
import { startScheduler } from './scheduler/index.js';
import { startWorker } from './workers/crawler.worker.js';

await connectRabbitMQ();

console.log('Observatório Público');

startWorker();
startScheduler();