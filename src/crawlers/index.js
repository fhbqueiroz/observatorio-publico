import { execute as transparenciaMs } from './transparencia-ms/crawler.js';
import { execute as alems } from './alems/crawler.js';
import { execute as camaraCg } from './camara-cg/crawler.js';

export const crawlers = {
    'transparencia-ms': transparenciaMs,
    alems,
    'camara-cg': camaraCg
};