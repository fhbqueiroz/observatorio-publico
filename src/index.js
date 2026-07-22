import 'dotenv/config';

import { connectRabbitMQ } from './queue/rabbitmq.js';
import { startScheduler } from './scheduler/index.js';
import { startWorker } from './workers/crawler.worker.js';
import * as logger from './shared/logger.js';
import { startApi } from './api/server.js';

await connectRabbitMQ();

logger.info('Observatório Público');

startApi();
startWorker();
startScheduler();