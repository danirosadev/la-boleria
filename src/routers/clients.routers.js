import { Router } from "express";
import { postNewClient } from "../controllers/clients.controllers.js";

const clientsRouter = Router();

clientsRouter.post("/clients", postNewClient);
clientsRouter.get("/clients/:id/orders");

export default clientsRouter;