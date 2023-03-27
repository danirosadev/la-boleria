import { Router } from "express";
import { getClientsOrders, postNewClient } from "../controllers/clients.controllers.js";

const clientsRouter = Router();

clientsRouter.post("/clients", postNewClient);
clientsRouter.get("/clients/:id/orders", getClientsOrders);

export default clientsRouter;