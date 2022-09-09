import express from "express";
import { authRouter } from "./api/auth";
import { userRouter } from "./api/user";

export const apiRouter = express.Router();

// this is the mini application that holds all api routes 🔹
apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
