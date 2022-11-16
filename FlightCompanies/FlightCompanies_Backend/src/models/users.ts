import bcrypt from 'bcryptjs';
import client from '../database';

// import { userStatus, userRoles } from '../utils/enum';

const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.BCRYPT_PASSWORD as string;

export type User = {
  email: string;
  id?: number;
  firstname: string;
  lastname: string;
  status: number;
  roles: number;
  password_digest: string;
};

export type UsersStatus = {
  id: number;
  status_name: string;
};

export type UsersRoles = {
  id: number;
  roles_name: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT email, users.id, firstname, lastname, status.status_name as status, roles.roles_name as roles, password_digest FROM users' +  
        ' INNER JOIN status ON users.status = status.id'+ 
        ' INNER JOIN roles ON users.roles = roles.id' +
        ' ORDER BY users.id';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error: any) {
      throw new Error(`Could not retrieve users. Error: ${error.message}`);
    }
  }

  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT email, users.id, firstname, lastname, status.status_name as status, roles.roles_name as roles, password_digest FROM users' +  
      ' INNER JOIN status ON users.status = status.id'+ 
      ' INNER JOIN roles ON users.roles = roles.id'+ 
      ' WHERE users.id=($1)'+
      ' ORDER BY users.id';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not get user ${id}. Error: ${error}`);
    }
  }

  async create(user: User): Promise<User> {
    try {
      const sql =
        'INSERT INTO users (firstname, lastname, email, status, roles, password_digest) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
      const conn = await client.connect();
      const hash = bcrypt.hashSync(
        user.password_digest + pepper,
        parseInt(saltRounds as string, 10)
      );

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
    } catch (error: any) {
      throw new Error(`Could not add new user. Error: ${error}`);
    }
  }

  async authenticate(user: User): Promise<User> {
    try {
      // const sql1 = 'SELECT * FROM users WHERE email=($1)';
      const sql = 'SELECT email, users.id, firstname, lastname, status.status_name as status, roles.roles_name as roles, password_digest FROM users' +  
      ' INNER JOIN status ON users.status = status.id'+ 
      ' INNER JOIN roles ON users.roles = roles.id'+ 
      ' WHERE users.email=($1)';
      const conn = await client.connect();
      const result = await conn.query(sql, [user.email]);
      conn.release();
      if (result.rows.length) {
        const compareBcrypt = bcrypt.compareSync(
          user.password_digest + pepper,
          result.rows[0].password_digest
        );
        if (compareBcrypt) return result.rows[0];
        throw new Error(`Password of ${user.email} is not correct`);
      }
      throw new Error(`No user for ${user.email}`);
    } catch (error: any) {
      throw new Error(`Could not authenticate user. Error: ${error}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const conn = await client.connect();
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete user ${id}. Error: ${error}`);
    }
  }

  async indexStatus(): Promise<UsersStatus[]> {
    try {
      const sql = 'SELECT * FROM status';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Could not retrieve users status. Error: ${error.message}`
      );
    }
  }

  async indexRoles(): Promise<UsersRoles[]> {
    try {
      const sql = 'SELECT * FROM roles';
      const conn = await client.connect();
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error: any) {
      throw new Error(
        `Could not retrieve users roles. Error: ${error.message}`
      );
    }
  }

}
