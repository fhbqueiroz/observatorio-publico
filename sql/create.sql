CREATE TABLE source (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    url VARCHAR(500),
    active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE crawler_execution (
    id BIGSERIAL PRIMARY KEY,
    source_id INT NOT NULL REFERENCES source(id),
    started_at TIMESTAMP NOT NULL DEFAULT NOW(),
    finished_at TIMESTAMP,
    success BOOLEAN,
    message TEXT
);
