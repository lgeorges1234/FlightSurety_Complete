CREATE TABLE flightStatus (
    id bigint PRIMARY KEY,
    name VARCHAR(100)
);

INSERT INTO flightStatus("id", "name") VALUES (E'0', E'unknown');
INSERT INTO flightStatus("id", "name") VALUES (E'1', E'on_time');
INSERT INTO flightStatus("id", "name") VALUES (E'2', E'late_airline');
INSERT INTO flightStatus("id", "name") VALUES (E'3', E'late_weather');
INSERT INTO flightStatus("id", "name") VALUES (E'4', E'late_technical');
INSERT INTO flightStatus("id", "name") VALUES (E'5', E'late_other');
INSERT INTO flightStatus("id", "name") VALUES (E'6', E'cancelled');