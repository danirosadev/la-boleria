import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cakesRouter from "./routers/cakes.routers.js"
import clientsRouter from "./routers/clients.routers.js"
import ordersRouter from "./routers/orders.routers.js"
import flavoursRouter from "./routers/flavours.routers.js"

dotenv.config()
const server = express()
server.use(cors())
server.use(express.json())

server.use([cakesRouter, clientsRouter, ordersRouter, flavoursRouter])

server.listen(process.env.PORT, () => {
    console.log("Servidor rodando na porta " + process.env.PORT)
})