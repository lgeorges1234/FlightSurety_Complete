CREATE TABLE flights (
    id SERIAL UNIQUE PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    date TIMESTAMP WITH TIME ZONE NOT NULL,
    departure VARCHAR(20) REFERENCES airports(code),
    arrival VARCHAR(20) REFERENCES airports(code),
    status bigint REFERENCES flightStatus(id) NOT NULL,
    airline_id BIGINT REFERENCES airlines(id) NOT NULL
);