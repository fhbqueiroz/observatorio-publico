import got from 'got';

import config from './config.js';
import { parse } from './parser.js';
import { save } from './repository.js';

export async function execute() {
    const response = await got(config.url);

    const result = parse(response.body);

    result.sourceId = config.sourceId;

    await save(result);

    console.log('ALEMS finalizado.');
}