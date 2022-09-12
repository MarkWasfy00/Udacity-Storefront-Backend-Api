import { db } from "../database/database";
import { errorHandler, successWithData } from "../functions/responseHandler";

import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import { OrderModel } from "./types/OrderModel";

class Order {
  async index(): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT * FROM orders ORDER BY id";
      const response = await connection.query(query);
      connection.release();
      return successWithData("Fetched all orders", response.rows);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async show(id: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "SELECT * FROM orders WHERE id=$1";
      const response = await connection.query(query, [id]);
      connection.release();
      if (response.rowCount) {
        return successWithData("Order fetched", response.rows[0]);
      } else {
        return errorHandler("Order not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async create(id: number, status: boolean): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "INSERT INTO orders (user_id, is_complete) VALUES ($1, $2) RETURNING *";
      const response = await connection.query(query, [id, status]);
      connection.release();
      return successWithData("Order created", response.rows);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async update(id: number, order: OrderModel): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "UPDATE orders SET user_id=$1, is_complete=$2 WHERE id=$3 RETURNING *";
      const response = await connection.query(query, [order.user_id, order.is_complete, id]);
      connection.release();
      if (response.rowCount) {
        return successWithData("Order updated", response.rows[0]);
      } else {
        return errorHandler("Order not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async destroy(id: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "DELETE FROM orders WHERE id=$1 RETURNING id";
      // const query2 = "DELETE FROM order_products WHERE orders.id=$1";
      const response = await connection.query(query, [id]);
      // const test = await connection.query(query2, [id]);
      connection.release();
      if (response.rowCount) {
        return successWithData("Order deleted", response.rows[0]);
      } else {
        return errorHandler("Order not found");
      }
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }

  async addProduct(orderId: string, productId: string, quantity: number): Promise<FullMessage | ReturnMessage> {
    try {
      const connection = await db.connect();
      const query = "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *";
      const response = await connection.query(query, [orderId, productId, quantity]);
      connection.release();
      return successWithData("Order added", response.rows[0]);
    } catch (err) {
      return errorHandler((err as Error).message);
    }
  }
}

export default Order;
