import * as repository from './repository.js';

export async function saveAll(bids) {
    for (const bid of bids) {
        await repository.save(bid);
    }
}