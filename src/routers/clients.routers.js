import { Router } from "express";

const clientsRouter = Router();

clientsRouter.post("/clients");
clientsRouter.get("/clients/:id/orders");

export default clientsRouter;