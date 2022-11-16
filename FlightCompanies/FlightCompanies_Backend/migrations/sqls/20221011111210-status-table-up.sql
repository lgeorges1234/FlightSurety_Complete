CREATE TABLE status (
    id bigint PRIMARY KEY,
    status_name VARCHAR(100)
);

INSERT INTO status("id", "status_name") VALUES (E'1', E'root');
INSERT INTO status("id", "status_name") VALUES (E'2', E'admin');
INSERT INTO status("id", "status_name") VALUES (E'3', E'disactiv');
INSERT INTO status("id", "status_name") VALUES (E'4', E'activ');