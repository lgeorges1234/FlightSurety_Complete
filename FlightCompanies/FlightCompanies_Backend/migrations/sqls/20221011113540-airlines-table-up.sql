CREATE TABLE airlines (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country_id VARCHAR(64) NOT NULL,
    CONSTRAINT fk_country FOREIGN KEY(country_id) REFERENCES countries(id)
);