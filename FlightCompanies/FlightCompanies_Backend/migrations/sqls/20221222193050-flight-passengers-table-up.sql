CREATE TABLE flight_Passengers(
    id SERIAL PRIMARY KEY,
    flight_id bigint REFERENCES flights(id),
    passenger_id bigint REFERENCES users(id)
);