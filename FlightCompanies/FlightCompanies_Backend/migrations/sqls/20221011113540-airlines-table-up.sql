CREATE TABLE airlines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country_id VARCHAR(64) NOT NULL,
    user_id BIGINT NOT NULL,
    CONSTRAINT fk_country FOREIGN KEY(country_id) REFERENCES countries(id),
    CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
);