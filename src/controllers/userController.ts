import { Request, Response } from "express";
import { FullMessage, ReturnMessage } from "../functions/types/ResponseHandler";
import securityConfig from "../config/env/security.config";
import jwt from "jsonwebtoken";
import User from "../models/userModel";

const USER = new User();

export const createUser = async (req: Request, res: Response): Promise<void> => {
  const result: ReturnMessage = await USER.create(req.body);
  res.status(result.status).json(result);
};

export const getUsers = async (_req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await USER.index();
  res.status(result.status).json(result);
};

export const showUser = async (_req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await USER.show(1);
  res.status(result.status).json(result);
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await USER.update(req.body);
  res.status(result.status).json(result);
};

export const deleteUser = async (_req: Request, res: Response): Promise<void> => {
  const result: FullMessage | ReturnMessage = await USER.destroy(1);
  res.status(result.status).json(result);
};

export const authUser = async (_req: Request, res: Response): Promise<void> => {
  const result = await USER.auth("test@gmail.com", "fakepassword");
  if ("data" in result) {
    const userToken = jwt.sign(result.data, securityConfig.JWT_TOKEN as unknown as string);
    res.status(result.status).json({ ...result, userToken });
  } else {
    res.status(result.status).json(result);
  }
};
