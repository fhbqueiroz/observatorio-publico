import { db } from '../../database/postgres.js';

export async function save(bid) {
    await db.query(
        `
        INSERT INTO bids (
            source_id,
            external_id,
            title,
            organization,
            modality,
            status,
            opening_at,
            estimated_value,
            details_url
        )
        VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9
        )
        ON CONFLICT (
            source_id,
            external_id
        )
        DO UPDATE SET
            title = EXCLUDED.title,
            organization = EXCLUDED.organization,
            modality = EXCLUDED.modality,
            status = EXCLUDED.status,
            opening_at = EXCLUDED.opening_at,
            estimated_value = EXCLUDED.estimated_value,
            details_url = EXCLUDED.details_url,
            updated_at = NOW()
        `,
        [
            bid.sourceId,
            bid.externalId,
            bid.title,
            bid.organization,
            bid.modality,
            bid.status,
            bid.openingAt,
            bid.estimatedValue,
            bid.detailsUrl
        ]
    );
}