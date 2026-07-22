import 'dotenv/config';

import { connectRabbitMQ } from './queue/rabbitmq.js';
import { startScheduler } from './scheduler/index.js';

await connectRabbitMQ();

console.log('Observatório Público');

startScheduler();