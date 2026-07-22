import got from 'got';

import * as executionRepository from './execution.repository.js';
import * as logger from './logger.js';
import * as sourceRepository from '../database/source.repository.js';

async function download(url, attempts = 3) {
    let lastError;

    for (let i = 1; i <= attempts; i++) {
        try {
            return await got(url, {
                timeout: {
                    request: 30000
                }
            });
        } catch (error) {
            lastError = error;

            logger.warn(
                `Tentativa ${i}/${attempts} falhou: ${error.message}`
            );
        }
    }

    throw lastError;
}

export async function executeCrawler({
    config,
    parser,
    repository
}) {
    const source = await sourceRepository.findByName(config.name);

    if (!source) {
        throw new Error(`Fonte "${config.name}" não encontrada.`);
    }

    const executionId = await executionRepository.start(source.id);

    try {
        const response = await download(config.url);

        const result = parser(response.body);

        result.sourceId = source.id;

        await repository.save(result);

        await executionRepository.finish(executionId, true);

        logger.info(`${config.name} finalizado.`);
    } catch (error) {
        await executionRepository.finish(
            executionId,
            false,
            error.message
        );

        logger.error(`${config.name}: ${error.message}`);

        throw error;
    }
}