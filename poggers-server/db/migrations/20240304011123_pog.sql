-- migrate:up
CREATE TABLE pogs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ticker_symbol VARCHAR(255) NOT NULL,
    color VARCHAR(255) NOT NULL
);

-- migrate:down
drop table pogs