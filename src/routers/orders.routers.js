import { Router } from "express";
import { postNewOrder } from "../controllers/orders.controllers.js";
import validateOrder from "../midllewares/ordersMiddlewares.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateOrder(postNewOrder));
ordersRouter.get("/orders");
ordersRouter.get("/orders/:id");

export default ordersRouter;