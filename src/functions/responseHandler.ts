import { UserModel } from "../models/types/UserModel";
import { FullMessage, ReturnMessage } from "./types/ResponseHandler";

export const errorHandler = (msg: string, code?: number): ReturnMessage => {
  const status = code || 400;
  return { msg, status };
};

export const successHandler = (msg: string, code?: number): ReturnMessage => {
  const status = code || 200;
  return { msg, status };
};

export const successWithData = (msg: string, data: UserModel | UserModel[], code?: number): FullMessage => {
  const status = code || 200;
  return { msg, data, status };
};
