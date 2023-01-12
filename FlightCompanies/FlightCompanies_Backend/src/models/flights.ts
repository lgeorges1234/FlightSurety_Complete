import client from "../database";
import { User } from "./users";

export type Flight = {
    id?:number;
    name:string;
    date:Date;
    departure: string,
    arrival: string,
    status:number;
    airline_id:string;
}

export type FlightStatus = {
    id: number;
    status_name: string;
  };

export type FlightPassenger = {
    id?: number;
    flight_id: number;
    user_id: number;
}

export class FlightStore {
    async index(): Promise<Flight[]> {
        try {
            const sql = 'SELECT * FROM flights';
            const conn = await client.connect();
            const indexResult = await conn.query(sql);
            conn.release();
            return indexResult.rows;
        } catch (error) {
            throw new Error(`Could not get flights. ${error}`);
        }
        }

    async show(id: string): Promise<Flight> {
        try {
            const sql = 'SELECT * FROM flights WHERE id=($1)';
            const conn = await client.connect();
            const showResult = await conn.query(sql, [id]);
            conn.release();
            return showResult.rows[0];
        } catch (error) {
            throw new Error(`Could not get flight ${id}. ${error}`);
        }
    }

    async create(flight: Flight): Promise<Flight> {
        // console.log(`flight -- create -- flight : ${JSON.stringify(flight)}`)
        try {
            const sql =
            'INSERT INTO flights (name, date, departure, arrival, status, airline_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
            const conn = await client.connect();
            const createResult = await conn.query(sql, [flight.name, flight.date, flight.departure, flight.arrival, flight.status, flight.airline_id]);
            conn.release();
            return createResult.rows[0];
        } catch (error) {
            throw new Error(`Could not add new flight. ${error}`);
        }
    }

    async delete(id: string): Promise<Flight> {
    try {
        const sql = 'DELETE FROM flights WHERE id=($1) RETURNING *';
        const conn = await client.connect();
        const deleteResult = await conn.query(sql, [id]);
        conn.release();
        return deleteResult.rows[0];
    } catch (error) {
        throw new Error(`Could not delete flight ${id}. ${error}`);
    }
    }

    async addPassenger(flightPassengers: FlightPassenger): Promise<User> {
      try {
          const sql =
          'INSERT INTO flight_passengers (flight_id, passenger_id) VALUES($1, $2, $3) RETURNING *';
          const conn = await client.connect();
          const result = await conn.query(sql, [
          flightPassengers.flight_id,
          flightPassengers.user_id,
          ]);
          conn.release();
          return result.rows[0];
      } catch (error) {
          throw new Error(
          `Could not add passenger ${flightPassengers.user_id} to flight${flightPassengers.flight_id}: Error ${error}`
          );
      }
    }

    async indexPassengersFromFlight(flight_id: number): Promise<User[]> {
    try {
        const conn = await client.connect();
        const sql = 'SELECT * FROM flight_passengers WHERE flight_id=($1)';
        const result = await conn.query(sql, [flight_id]);
        conn.release();
        return result.rows;
    } catch (error) {
        throw new Error(
        `Could not get passengers from flight ${flight_id}: Error ${error}`
        );
    }
    }

    async removePassenger(flightPassengers: FlightPassenger): Promise<Flight> {
    try {
        const conn = await client.connect();
        const sql =
        'DELETE FROM flight_passengers WHERE flight_id=($1) AND user_id=($2) RETURNING *';
        const result = await conn.query(sql, 
          [
            flightPassengers.flight_id,
            flightPassengers.user_id,
          ]);
        conn.release();
        return result.rows[0];
    } catch (error) {
        throw new Error(
        `Could not remove passenger ${flightPassengers.user_id} from flight ${flightPassengers.flight_id}: Error ${error}`
        );
    }
    }
}