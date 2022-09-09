import { db } from "../database/database";
import { hashThisPassword } from "../functions/passwordHash";
import { errorHandler, successHandler, successWithData } from "../functions/responseHandler";
import bcrypt from "bcrypt";

// types
import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import { UserModel } from "./types/UserModel";

class User {
  // create user
  async create(user: UserModel): Promise<ReturnMessage> {
    try {
      const connection = await db.connect();
      const data = [user.email, user.name, user.age, hashThisPassword(user.password)];
      const query = `INSERT INTO users (email, name, age, password) values ($1, $2, $3, $4) returning name`;
      const response = await connection.query(query, data);
      connection.release();
      return successHandler(`success created User: ${response.rows[0].name}`);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
  // get all users
  async index(): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT id, email, name, age from users";
      const response = await connection.query(query);
      connection.release();
      return successWithData("Users Fetched", response.rows);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
  // get specific user
  async show(id: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = `SELECT id, email, name, age FROM users WHERE id=($1)`;
      const response = await connection.query(query, [id]);
      connection.release();
      if (response.rowCount) {
        return successWithData("User Fetched", response.rows[0]);
      } else {
        return errorHandler("User not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
  // update specific user
  async update(user: UserModel): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const data = [user.email, user.name, user.age, hashThisPassword(user.password), user.id];
      const query = `UPDATE users SET email=$1, name=$2, age=$3, password=$4 WHERE id=$5 returning name`;
      const response = await connection.query(query, data);
      connection.release();
      return successHandler(`User Updated: ${response.rows[0].name}`);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
  // delete user
  async destroy(id: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT name FROM users WHERE id=$1";
      const response = await connection.query(query, [id]);
      if (response.rowCount) {
        const userInfo = await connection.query("DELETE FROM users WHERE id=$1 returning name", [id]);
        connection.release();
        return successHandler(`User Deleted: ${userInfo.rows[0].name}`);
      } else {
        connection.release();
        return errorHandler("User not exist");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
  // auth user
  async auth(email: string, password: string): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const data = [email];
      const query = `SELECT password FROM users WHERE email=$1`;
      const response = await connection.query(query, data);
      if (response.rows.length) {
        const userPassword = response.rows[0].password;
        const validPassword = bcrypt.compareSync(password, userPassword);
        if (validPassword) {
          const userInfo = await connection.query(`SELECT id, name, email, age from users WHERE email=$1`, data);
          connection.release();
          return successWithData(`User Authorized`, userInfo.rows[0]);
        } else {
          return errorHandler(`Wrong password`);
        }
      } else {
        connection.release();
        return errorHandler(`Email not exist`);
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
}

export default User;
