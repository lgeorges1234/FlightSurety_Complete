CREATE TABLE airlineOwners(
    id SERIAL PRIMARY KEY,
    airline_id bigint REFERENCES airlines(id),
    user_id bigint REFERENCES users(id)
);