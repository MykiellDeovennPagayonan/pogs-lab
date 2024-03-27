-- migrate:up
CREATE TYPE user_role AS ENUM ('admin', 'regular');
CREATE TABLE users (
    id VARCHAR(15) PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL,
    role user_role NOT NULL,
    funds DECIMAL NOT NULL
)

-- migrate:down
drop table users;
drop type user_role;
