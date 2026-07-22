import express from 'express';

import routes from './routes.js';
import * as logger from '../shared/logger.js';

export function startApi() {
    const app = express();

    app.use(express.json());

    app.use(routes);

    app.listen(3000, () => {
        logger.info('API iniciada na porta 3000.');
    });
}