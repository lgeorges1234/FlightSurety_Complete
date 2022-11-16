CREATE TABLE flightStatus (
    id bigint PRIMARY KEY,
    status_name VARCHAR(100)
);

INSERT INTO status("id", "status_name") VALUES (E'1', E'intime');
INSERT INTO status("id", "status_name") VALUES (E'2', E'late');
INSERT INTO status("id", "status_name") VALUES (E'3', E'cancelled');