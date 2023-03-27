import { Router } from "express";
import { postFlavour } from "../controllers/flavours.controller.js";

const flavoursRouter = Router();

flavoursRouter.post("/flavours", postFlavour);

export default flavoursRouter;