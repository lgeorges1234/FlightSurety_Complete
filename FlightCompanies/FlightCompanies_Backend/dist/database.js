"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
const { POSTGRES_HOST, POSTGRES_DB_DEV, POSTGRES_USER_DEV, POSTGRES_PASSWORD_DEV, POSTGRES_DB_TEST, POSTGRES_USER_TEST, POSTGRES_PASSWORD_TEST, PORT_DEV, ENV, } = process.env;
let client = new pg_1.Pool();
console.log(`ENV var: ${ENV}`);
console.log(`POSTGRES_HOST: ${POSTGRES_HOST}`);
console.log(`POSTGRES_HOST_DEV: ${POSTGRES_HOST}`);
if (ENV === 'test') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER_TEST,
        password: POSTGRES_PASSWORD_TEST,
    });
}
if (ENV === 'dev') {
    client = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_DEV,
        user: POSTGRES_USER_DEV,
        password: POSTGRES_PASSWORD_DEV,
    });
}
exports.default = client;
