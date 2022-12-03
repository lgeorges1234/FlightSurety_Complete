"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../database"));
// import { userStatus, userRoles } from '../utils/enum';
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD;
class UserStore {
    async index() {
        try {
            const sql = 'SELECT email, users.id, firstname, lastname, status.status_name as status, roles.roles_name as roles, password_digest' +
                ' FROM users' +
                ' INNER JOIN status ON users.status = status.id' +
                ' INNER JOIN roles ON users.roles = roles.id' +
                ' ORDER BY users.id';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not retrieve users. Error: ${error.message}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT email, users.id, firstname, lastname, status.status_name as status, roles.roles_name as roles, password_digest FROM users' +
                ' INNER JOIN status ON users.status = status.id' +
                ' INNER JOIN roles ON users.roles = roles.id' +
                ' WHERE users.id=($1)' +
                ' ORDER BY users.id';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get user ${id}. Error: ${error}`);
        }
    }
    async create(user) {
        try {
            const sql = 'INSERT INTO users (firstname, lastname, email, status, roles, password_digest) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
            const conn = await database_1.default.connect();
            const hash = bcryptjs_1.default.hashSync(user.password_digest + pepper, parseInt(saltRounds, 10));
            const result = await conn.query(sql, [
                user.firstname,
                user.lastname,
                user.email,
                user.status,
                user.roles,
                hash,
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add new user. Error: ${error}`);
        }
    }
    async authenticate(user) {
        try {
            // const sql1 = 'SELECT * FROM users WHERE email=($1)';
            const sql = 'SELECT email, users.id, firstname, lastname, status.status_name as status, roles.roles_name as roles, password_digest FROM users' +
                ' INNER JOIN status ON users.status = status.id' +
                ' INNER JOIN roles ON users.roles = roles.id' +
                ' WHERE users.email=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [user.email]);
            conn.release();
            if (result.rows.length) {
                const compareBcrypt = bcryptjs_1.default.compareSync(user.password_digest + pepper, result.rows[0].password_digest);
                if (compareBcrypt)
                    return result.rows[0];
                throw new Error(`Password of ${user.email} is not correct`);
            }
            throw new Error(`No user for ${user.email}`);
        }
        catch (error) {
            throw new Error(`Could not authenticate user. Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete user ${id}. Error: ${error}`);
        }
    }
    async indexStatus() {
        try {
            const sql = 'SELECT * FROM status';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not retrieve users status. Error: ${error.message}`);
        }
    }
    async indexRoles() {
        try {
            const sql = 'SELECT * FROM roles';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not retrieve users roles. Error: ${error.message}`);
        }
    }
}
exports.UserStore = UserStore;
