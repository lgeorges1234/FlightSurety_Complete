"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// export class FlightStore {
// async index(): Promise<Flight[]> {
//     try {
//         const sql = 'SELECT * FROM flights';
//         const conn = await client.connect();
//         const indexResult = await conn.query(sql);
//         conn.release();
//         return indexResult.rows;
//     } catch (error) {
//         throw new Error(`Could not get flights. Error: ${error}`);
//     }
//     }
//     async show(id: string): Promise<Flight> {
//     try {
//         const sql = 'SELECT * FROM flights WHERE id=($1)';
//         const conn = await client.connect();
//         const showResult = await conn.query(sql, [id]);
//         conn.release();
//         return showResult.rows[0];
//     } catch (error) {
//         throw new Error(`Could not get flight ${id}. Error: ${error}`);
//     }
//     }
//     async create(flight: Flight): Promise<Flight> {
//     try {
//         const sql =
//         'INSERT INTO flights (status, user_id) VALUES($1, $2) RETURNING *';
//         const conn = await client.connect();
//         const createResult = await conn.query(sql, [flight.status, flight.user_id]);
//         conn.release();
//         return createResult.rows[0];
//     } catch (error) {
//         throw new Error(`Could not add new flight. Error: ${error}`);
//     }
//     }
//     async delete(id: string): Promise<Flight> {
//     try {
//         const sql = 'DELETE FROM flights WHERE id=($1) RETURNING *';
//         const conn = await client.connect();
//         const deleteResult = await conn.query(sql, [id]);
//         conn.release();
//         return deleteResult.rows[0];
//     } catch (error) {
//         throw new Error(`Could not delete flight ${id}. Error: ${error}`);
//     }
//     }
//     async addProduct(flights: Flight): Promise<Flight> {
//     try {
//         const sql =
//         'INSERT INTO flights (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
//         const conn = await client.connect();
//         const result = await conn.query(sql, [
//         flights.quantity,
//         flights.order_id,
//         flights.product_id,
//         ]);
//         conn.release();
//         return result.rows[0];
//     } catch (error) {
//         throw new Error(
//         `Could not add product ${flights.product_id} to order ${flights.order_id}: Error ${error}`
//         );
//     }
//     }
//     async indexProduct(): Promise<Flight[]> {
//     try {
//         const conn = await client.connect();
//         const sql = 'SELECT * FROM flights';
//         const result = await conn.query(sql);
//         conn.release();
//         return result.rows;
//     } catch (error) {
//         throw new Error(
//         `Could not get products from flights: Error ${error}`
//         );
//     }
//     }
//     async editProduct(orderId: string): Promise<Flight[]> {
//     try {
//         const conn = await client.connect();
//         const sql = 'SELECT * FROM flights WHERE order_id=($1)';
//         const result = await conn.query(sql, [orderId]);
//         conn.release();
//         return result.rows;
//     } catch (error) {
//         throw new Error(
//         `Could not get products from order ${orderId}: Error ${error}`
//         );
//     }
//     }
//     async updateProduct(flights: Flight): Promise<Flight> {
//     try {
//         const conn = await client.connect();
//         const sql =
//         'UPDATE flights SET quantity=($1) WHERE order_id=($2) AND product_id=($3) RETURNING *';
//         const result = await conn.query(sql, [
//         flights.quantity,
//         flights.order_id,
//         flights.product_id,
//         ]);
//         conn.release();
//         return result.rows[0];
//     } catch (error) {
//         throw new Error(
//         `Could not update product ${flights.product_id} to order ${flights.order_id}: Error ${error}`
//         );
//     }
//     }
//     async removeProduct(
//     orderId: string,
//     productId: string
//     ): Promise<Flight> {
//     try {
//         const conn = await client.connect();
//         const sql =
//         'DELETE FROM flights WHERE order_id=($1) AND product_id=($2) RETURNING *';
//         const result = await conn.query(sql, [orderId, productId]);
//         conn.release();
//         return result.rows[0];
//     } catch (error) {
//         throw new Error(
//         `Could not remove product ${productId} to order ${orderId}: Error ${error}`
//         );
//     }
//     }
// }
