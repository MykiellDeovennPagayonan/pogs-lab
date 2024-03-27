-- migrate:up
CREATE TABLE user_session (
    id TEXT PRIMARY KEY,
    expires_at TIMESTAMPTZ NOT NULL,
    user_id VARCHAR(15) NOT NULL REFERENCES USERS(id)
)

-- migrate:down
drop table user_session;
