import express from "express";
import {
  addProduct,
  createOrder,
  deleteOrder,
  getOrders,
  showOrder,
  updateOrder,
} from "../../controllers/orderController";
import { auth } from "../../middlewares/auth";
import { idRules, orderProductRules } from "../../middlewares/validation/routesRulesMiddleware";
import { validate } from "../../middlewares/validation/validateMiddleware";

export const orderRouter = express.Router();

orderRouter.get("/", auth, getOrders);
orderRouter.get("/:id", idRules, validate, auth, showOrder);

orderRouter.post("/", auth, createOrder);
orderRouter.post("/:id/update", idRules, validate, auth, updateOrder);
orderRouter.post("/:id/delete", idRules, validate, auth, deleteOrder);
orderRouter.post("/:id/products", idRules, orderProductRules, validate, auth, addProduct);