"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersStatusStore = void 0;
const database_1 = __importDefault(require("../database"));
class usersStatusStore {
    async index() {
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
    async show(id) {
        try {
            const sql = 'SELECT * FROM status WHERE id=($1)';
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get status ${id}. Error: ${error}`);
        }
    }
}
exports.usersStatusStore = usersStatusStore;
