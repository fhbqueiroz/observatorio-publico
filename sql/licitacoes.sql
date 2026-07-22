CREATE TABLE bids (
    id BIGSERIAL PRIMARY KEY,

    source_id INT NOT NULL REFERENCES sources(id),

    external_id VARCHAR(200) NOT NULL,

    title TEXT NOT NULL,

    organization VARCHAR(300),

    modality VARCHAR(100),

    status VARCHAR(100),

    opening_at TIMESTAMP,

    estimated_value NUMERIC(18,2),

    details_url TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT uq_bid UNIQUE (
        source_id,
        external_id
    )
);

CREATE INDEX idx_bid_external
ON bids(external_id);

CREATE INDEX idx_bid_source
ON bids(source_id);

CREATE INDEX idx_bid_status
ON bids(status);

CREATE INDEX idx_bid_opening
ON bids(opening_at);