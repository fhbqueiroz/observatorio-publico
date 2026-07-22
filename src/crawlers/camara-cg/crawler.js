import { executeCrawler } from '../../shared/base-crawler.js';

import config from './config.js';
import { parse } from './parser.js';
import * as repository from './repository.js';

export async function execute() {
    return executeCrawler({
        config,
        parser: parse,
        repository
    });
}