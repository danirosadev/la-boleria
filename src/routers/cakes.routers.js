import { Router } from "express";
import { postNewCake } from "../controllers/cakes.controllers.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", postNewCake);

export default cakesRouter;