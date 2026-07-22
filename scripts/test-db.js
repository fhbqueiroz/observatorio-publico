import { db } from '../src/database/postgres.js';
import * as logger from '../src/shared/logger.js';

const result = await db.query('SELECT NOW()');

logger.info(result.rows[0]);

await db.end();