import express from "express";
import { deleteUser, getUsers, showUser, updateUser } from "../../controllers/userController";
import { auth } from "../../middlewares/auth";
import {
  idUserRulesOnBody,
  idUserRulesOnParams,
  userRules,
  validate,
} from "../../middlewares/validation/routesValidationMiddleware";

export const userRouter = express.Router();

userRouter.get("/all", auth, getUsers);
userRouter.get("/show/:id", idUserRulesOnParams, validate, auth, showUser);

userRouter.post("/update", userRules, validate, auth, updateUser);
userRouter.post("/delete", idUserRulesOnBody, validate, auth, deleteUser);
