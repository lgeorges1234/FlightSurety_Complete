CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date TIME WITH TIME ZONE NOT NULL,
    status bigint REFERENCES flightStatus(id) NOT NULL,
    airline_id BIGINT NOT NULL,
    CONSTRAINT fk_airline FOREIGN KEY(airline_id) REFERENCES airlines(id)
);