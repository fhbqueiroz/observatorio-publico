import got from 'got';

import * as executionRepository from './execution.repository.js';
import * as logger from './logger.js';

export async function executeCrawler({
    config,
    parser,
    repository
}) {
    const executionId = await executionRepository.start(config.sourceId);

    try {
        const response = await got(config.url);

        const result = parser(response.body);

        result.sourceId = config.sourceId;

        await repository.save(result);

        await executionRepository.finish(executionId, true);

        logger.info(`${config.name} finalizado.`);
    } catch (error) {
        await executionRepository.finish(
            executionId,
            false,
            error.message
        );

        throw error;
    }
}