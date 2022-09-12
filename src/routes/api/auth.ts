import express from "express";
import { authUser, createUser } from "../../controllers/userController";
import { auth } from "../../middlewares/auth";
import { emailPasswordRules, userRules } from "../../middlewares/validation/routesRulesMiddleware";
import { validate } from "../../middlewares/validation/validateMiddleware";

export const authRouter = express.Router();

authRouter.post("/login", emailPasswordRules, validate, auth, authUser);
authRouter.post("/register", userRules, validate, createUser);
