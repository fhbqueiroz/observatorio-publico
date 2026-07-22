import { execute } from '../src/crawlers/alems/crawler.js';

try {
    await execute();
} catch (error) {
    // erro já foi registrado pelo logger
}

process.exit(0);