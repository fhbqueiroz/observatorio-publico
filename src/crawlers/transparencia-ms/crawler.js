import got from 'got';
import config from './config.js';
import { parse } from './parser.js';
import { db } from '../../database/postgres.js';

export async function save(page) {
    await db.query(
        `INSERT INTO page
        (source_id, title, language, links, images)
        VALUES ($1, $2, $3, $4, $5)`,
        [
            1,
            page.title,
            page.language,
            page.links,
            page.images
        ]
    );
}

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

        await save(result);

        console.log('Página salva com sucesso.');

    } catch (error) {
        console.error(error.message);
    }
}