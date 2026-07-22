import { Router } from 'express';
import { db } from '../database/postgres.js';

const router = Router();

router.get('/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});

router.get('/pages', async (req, res) => {
    const {
        source,
        page = 1,
        limit = 20
    } = req.query;

    const values = [];
    const where = [];

    if (source) {
        values.push(source);
        where.push(`s.name = $${values.length}`);
    }

    values.push(Number(limit));
    const limitIndex = values.length;

    values.push((Number(page) - 1) * Number(limit));
    const offsetIndex = values.length;

    const sql = `
        SELECT
            p.*,
            s.name AS source
        FROM pages p
        JOIN sources s
            ON s.id = p.source_id
        ${where.length ? `WHERE ${where.join(' AND ')}` : ''}
        ORDER BY p.collected_at DESC
        LIMIT $${limitIndex}
        OFFSET $${offsetIndex}
    `;

    const result = await db.query(sql, values);

    res.json(result.rows);
});

export default router;