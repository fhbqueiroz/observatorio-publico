import { db } from '../src/database/postgres.js';

const result = await db.query('SELECT NOW()');

console.log(result.rows[0]);

await db.end();