import client from "../database";

 export type Airport = {
    name: string,
    code: string,
    stateCode: string,
    countryCode: string,
    countryName: string
 }

 export class AirportStore {
    async index(): Promise<Airport[]> {
        try {
            const sql = 'SELECT name, code, countryName from airports' +
            ' ORDER BY countryName';
            const conn = await client.connect();
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error: any) {
            console.log(error.message);
            throw new Error(`Could not retrieve airports. Error: ${error.message}`);
        }
    }
 }