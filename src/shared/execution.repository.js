import { db } from '../database/postgres.js';

export async function start(sourceId) {
    const result = await db.query(
        `INSERT INTO crawler_executions
        (source_id)
        VALUES ($1)
        RETURNING id`,
        [sourceId]
    );

    return result.rows[0].id;
}

export async function finish(id, success, message = null) {
    await db.query(
        `UPDATE crawler_executions
        SET
            finished_at = NOW(),
            success = $2,
            message = $3
        WHERE id = $1`,
        [id, success, message]
    );
}