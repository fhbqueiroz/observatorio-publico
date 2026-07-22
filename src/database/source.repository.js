import { db } from './postgres.js';

export async function findByName(name) {
    const result = await db.query(
        'SELECT * FROM source WHERE name = $1 LIMIT 1',
        [name]
    );

    return result.rows[0];
}