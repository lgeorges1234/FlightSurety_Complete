CREATE TABLE flights (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL,
    date TIME WITH TIME ZONE NOT NULL,
    departure VARCHAR(20) REFERENCES airports(code),
    arrival VARCHAR(20) REFERENCES airports(code),
    status bigint REFERENCES flightStatus(id) NOT NULL,
    airline_id BIGINT REFERENCES airlines(id) NOT NULL,
);