"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_DB_DEV = _a.POSTGRES_DB_DEV, POSTGRES_USER_DEV = _a.POSTGRES_USER_DEV, POSTGRES_PASSWORD_DEV = _a.POSTGRES_PASSWORD_DEV, POSTGRES_DB_TEST = _a.POSTGRES_DB_TEST, POSTGRES_USER_TEST = _a.POSTGRES_USER_TEST, POSTGRES_PASSWORD_TEST = _a.POSTGRES_PASSWORD_TEST, PORT_DEV = _a.PORT_DEV, ENV = _a.ENV;
var client = new pg_1.Pool();
console.log("ENV var: ".concat(ENV));
console.log("POSTGRES_HOST: ".concat(POSTGRES_HOST));
console.log("POSTGRES_HOST_DEV: ".concat(POSTGRES_HOST));
if (ENV === 'test') {
    console.log("database.ts -- env=test");
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER_TEST,
        password: POSTGRES_PASSWORD_TEST
    });
}
if (ENV === 'dev') {
    console.log("database.ts -- env=dev");
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_DEV,
        user: POSTGRES_USER_DEV,
        password: POSTGRES_PASSWORD_DEV
    });
}
exports["default"] = client;
