import { Request, Response } from "express";
import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import securityConfig from "../config/env/security.config";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const USER = new User();

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await USER.create(req.body);
  res.status(result.status).json(result);
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await USER.index();
  res.status(result.status).json(result);
};

export const showUser = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await USER.show(req.params.id as unknown as number);
  res.status(result.status).json(result);
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await USER.update(req.body);
  res.status(result.status).json(result);
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await USER.destroy(req.body.id);
  res.status(result.status).json(result);
};

export const authUser = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await USER.auth(req.body.email, req.body.password);
  if ("data" in result) {
    const userToken = jwt.sign(result.data, securityConfig.JWT_TOKEN as unknown as string);
    res.status(result.status).json({ ...result, userToken });
  } else {
    res.status(result.status).json(result);
  }
};
