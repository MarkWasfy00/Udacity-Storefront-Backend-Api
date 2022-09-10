import { ReceivedUserModel } from "../../models/types/UserModel";

export type ReturnMessage = {
  // can be success message or error message
  msg: string;
  status: number;
};

export type DataMessage = {
  // success message with data
  data: ReceivedUserModel | ReceivedUserModel[];
};

export type FullMessage = ReturnMessage & DataMessage;
