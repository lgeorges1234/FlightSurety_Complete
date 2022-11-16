import client from '../database';

export type Airline = {
    id?:number;
    name:string;
    country_id:number;
    user_id:number;
};

export type Country = {
  id:string;
  value:string;
}

export type Owner = {
  user_id:number;
}

export class AirlineStore {
    async index(): Promise<Airline[]> {
        try {
          const sql = 'SELECT * FROM airlines';
          const conn = await client.connect();
          const indexResult = await conn.query(sql);
          conn.release();
          return indexResult.rows;
        } catch (error) {
          throw new Error(`Could not get airlines. Error: ${error}`);
        }
      }
    
      async show(id: string): Promise<Airline> {
        try {
          const sql = 'SELECT * FROM airlines WHERE id=($1)';
          const conn = await client.connect();
          const showResult = await conn.query(sql, [id]);
          conn.release();
          return showResult.rows[0];
        } catch (error) {
          throw new Error(`Could not get airline ${id}. Error: ${error}`);
        }
      }
    
      async create(airline: Airline): Promise<Airline> {
        try {
          const sql =
            'INSERT INTO airlines (name, country_id, user_id) VALUES($1, $2, $3) RETURNING *';
          const conn = await client.connect();
          const createResult = await conn.query(sql, [airline.name, airline.country_id, airline.user_id]);
          conn.release();
          return createResult.rows[0];
        } catch (error) {
          throw new Error(`Could not add new airline. Error: ${error}`);
        }
      }
    
      async delete(id: string): Promise<Airline> {
        try {
          const sql = 'DELETE FROM airlines WHERE id=($1) RETURNING *';
          const conn = await client.connect();
          const deleteResult = await conn.query(sql, [id]);
          conn.release();
          return deleteResult.rows[0];
        } catch (error) {
          throw new Error(`Could not delete airline ${id}. Error: ${error}`);
        }
      }
}