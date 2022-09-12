import { Request, Response } from "express";
import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import Product from "../models/productModel";

const PRODUCT = new Product();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await PRODUCT.create(req.body);
  res.status(result.status).json(result);
};

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await PRODUCT.index();
  res.status(result.status).json(result);
};

export const showProduct = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await PRODUCT.show(req.params.id as unknown as number);
  res.status(result.status).json(result);
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await PRODUCT.update(req.params.id as unknown as number, req.body);
  res.status(result.status).json(result);
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await PRODUCT.destroy(req.params.id as unknown as number);
  res.status(result.status).json(result);
};
