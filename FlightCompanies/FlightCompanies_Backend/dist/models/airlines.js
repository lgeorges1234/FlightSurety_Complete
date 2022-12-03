"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AirlineStore = void 0;
const database_1 = __importDefault(require("../database"));
class AirlineStore {
    async index() {
        try {
            const sql = 'SELECT * FROM airlines';
            const conn = await database_1.default.connect();
            const indexResult = await conn.query(sql);
            conn.release();
            return indexResult.rows;
        }
        catch (error) {
            throw new Error(`Could not get airlines. Error: ${error}`);
        }
    }
    async show(id) {
        try {
            const sql = 'SELECT * FROM airlines WHERE id=($1)';
            const conn = await database_1.default.connect();
            const showResult = await conn.query(sql, [id]);
            conn.release();
            return showResult.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get airline ${id}. Error: ${error}`);
        }
    }
    async create(airline) {
        try {
            const sql = 'INSERT INTO airlines (name, country_id) VALUES($1, $2) RETURNING *';
            const conn = await database_1.default.connect();
            const createResult = await conn.query(sql, [airline.name, airline.country_id]);
            conn.release();
            return createResult.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add new airline. Error: ${error}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM airlines WHERE id=($1) RETURNING *';
            const conn = await database_1.default.connect();
            const deleteResult = await conn.query(sql, [id]);
            conn.release();
            return deleteResult.rows[0];
        }
        catch (error) {
            throw new Error(`Could not delete airline ${id}. Error: ${error}`);
        }
    }
    async indexOwnersFromAirline(airlineId) {
        try {
            console.log(airlineId);
            const conn = await database_1.default.connect();
            const sql = 'SELECT *' +
                ' FROM users' +
                // ' INNER JOIN users ON airlineOwners.user_id=users.id' +
                ' INNER JOIN airlineOwners ON airlineOwners.user_id=users.id' +
                // ' INNER JOIN airlines ON airlineOwners.airline_id=airlines.id' +
                ' WHERE airlineOwners.airline_id=($1)';
            const result = await conn.query(sql, [airlineId]);
            console.log(result.rows);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not get owners from airline ${airlineId}: Error ${error}`);
        }
    }
    async showAirlineOwnership(userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT airlines.name' +
                ' FROM airlineOwners' +
                // ' INNER JOIN users ON airlineOwners.user_id=users.id' +
                ' INNER JOIN airlines ON airlineOwners.airline_id=airlines.id' +
                ' WHERE user_id=($1)';
            const result = await conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        }
        catch (error) {
            throw new Error(`Could not get airline from owners: Error ${error}`);
        }
    }
    async createOwner(airlineId, userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO airlineOwners (airline_id, user_id) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [
                airlineId,
                userId
            ]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not add new Owner to airline ${airlineId}. Error: ${error}`);
        }
    }
    async removeOwner(airlineId, userId) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'DELETE FROM airlineOwners WHERE airline_id=($1) AND user_id=($2) RETURNING *';
            const result = await conn.query(sql, [airlineId, userId]);
            conn.release();
            return result.rows[0];
        }
        catch (error) {
            throw new Error(`Could not remove user ${userId} to sirline ${airlineId}: Error ${error}`);
        }
    }
}
exports.AirlineStore = AirlineStore;
