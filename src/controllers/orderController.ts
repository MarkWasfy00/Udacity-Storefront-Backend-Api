import { Request, Response } from "express";
import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import Order from "../models/orderModel";

const ORDER = new Order();

export const createOrder = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await ORDER.create(2, false);
  res.status(result.status).json(result);
};

export const getOrders = async (_req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await ORDER.index();
  res.status(result.status).json(result);
};

export const showOrder = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await ORDER.show(req.params.id as unknown as number);
  res.status(result.status).json(result);
};

export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await ORDER.update(req.params.id as unknown as number, req.body);
  res.status(result.status).json(result);
};

export const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await ORDER.destroy(req.params.id as unknown as number);
  res.status(result.status).json(result);
};

export const addProduct = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await ORDER.addProduct(
    req.params.id,
    req.body.productId,
    req.body.quantity
  );
  res.status(result.status).json(result);
};
