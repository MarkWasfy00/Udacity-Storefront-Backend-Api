import express from "express";
import { authUser, createUser } from "../../controllers/userController";
import { emailPasswordRules, userRules, validate } from "../../middlewares/validation/routesValidationMiddleware";

export const authRouter = express.Router();

authRouter.post("/login", emailPasswordRules, validate, authUser);
authRouter.post("/register", userRules, validate, createUser);
