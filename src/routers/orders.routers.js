import { Router } from "express";
import { getOrderById, getOrders, postNewOrder } from "../controllers/orders.controllers.js";
//import validateOrder from "../midllewares/ordersMiddlewares.js";

const ordersRouter = Router();

ordersRouter.post("/order", postNewOrder);
ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrderById);

export default ordersRouter;