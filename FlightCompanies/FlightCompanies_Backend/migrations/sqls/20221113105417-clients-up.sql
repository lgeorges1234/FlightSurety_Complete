CREATE TABLE clients (
    id SERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);