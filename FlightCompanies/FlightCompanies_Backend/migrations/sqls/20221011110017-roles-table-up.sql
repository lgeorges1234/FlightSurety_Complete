CREATE TABLE roles (
    id bigint PRIMARY KEY,
    roles_name VARCHAR(100)
);

INSERT INTO roles("id", "roles_name") VALUES (E'1', E'operator');
INSERT INTO roles("id", "roles_name") VALUES (E'2', E'airline');
INSERT INTO roles("id", "roles_name") VALUES (E'3', E'client');
INSERT INTO roles("id", "roles_name") VALUES (E'4', E'guest');