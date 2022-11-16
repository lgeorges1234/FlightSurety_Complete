CREATE TABLE users (
    email VARCHAR(320) UNIQUE PRIMARY KEY NOT NULL,
    id SERIAL UNIQUE NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    status bigint REFERENCES status(id) NOT NULL,
    roles bigint REFERENCES roles(id) NOT NULL,
    password_digest VARCHAR(300) NOT NULL
);

INSERT INTO users("email","firstname", "lastname", "status", "roles", "password_digest") VALUES (E'root@root.com', E'root', E'root', 1, 1,'$2a$10$Q39HctalV1K0J6Z8NnejgeT3ZPwdj6AaUuiFaXM1SYKprw.5LHUnW')