import express from "express";

import { deleteUser, getUsers, showUser, updateUser } from "../../controllers/userController";
import { idRules, userRules } from "../../middlewares/validation/routesRulesMiddleware";
import { auth } from "../../middlewares/auth";
import { validate } from "../../middlewares/validation/validateMiddleware";

export const userRouter = express.Router();

userRouter.get("/", auth, getUsers);
userRouter.get("/:id", idRules, validate, auth, showUser);

userRouter.post("/:id/update", idRules, userRules, validate, auth, updateUser);
userRouter.post("/:id/delete", idRules, validate, auth, deleteUser);
