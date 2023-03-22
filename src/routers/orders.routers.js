import { Router } from "express";

const ordersRouter = Router();

ordersRouter.post("/order");
ordersRouter.get("/orders");
ordersRouter.get("/orders/:id");

export default ordersRouter;