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