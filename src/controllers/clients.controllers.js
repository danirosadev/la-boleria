import { findClientByNameRepository, postClientRepository, findClientByIdReporitory,getClientOrderRepository } from "../repositories/clientsRepositories.js";
import clientSchema from "../schemas/clientSchema.js";

export async function postNewClient (req, res) {

    try {
        const { name, address, phone } = await clientSchema.validateAsync(req.body)

        const isClient = await findClientByNameRepository(name)
        if (isClient.rowCount > 0) return res.sendStatus(409)

        const newClient = await postClientRepository(name, address, phone)
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getClientsOrders (req, res){
    const id = req.params.id

    try {
        const isClient = await findClientByIdReporitory(id)
        if (!isClient) return res.sendStatus(404)

        const result = await getClientOrderRepository(id)
        const orders = result.rows

        return res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
}