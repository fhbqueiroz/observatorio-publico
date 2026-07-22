import got from 'got';
import config from './config.js';
import { parse } from './parser.js';

export async function execute() {
    try {
        const response = await got(config.url, {
            timeout: {
                request: config.timeout
            }
        });

        console.log(`Status: ${response.statusCode}`);
        console.log(`HTML: ${response.body.length} bytes`);
        console.log('');

        const result = parse(response.body);

        console.log(result);

    } catch (error) {
        console.error(error.message);
    }
}