import { Router } from 'express';
import { db } from '../database/postgres.js';

const router = Router();

router.get('/health', (req, res) => {
    res.json({
        status: 'ok'
    });
});

router.get('/pages', async (req, res) => {
    const result = await db.query(`
        SELECT
            p.*,
            s.name AS source
        FROM pages p
        JOIN sources s
            ON s.id = p.source_id
        ORDER BY p.collected_at DESC
        LIMIT 100
    `);

    res.json(result.rows);
});

export default router;