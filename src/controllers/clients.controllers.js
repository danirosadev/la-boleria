import db from "../config/database.connection.js";
import Joi from "joi";

export async function postNewClient (req, res) {
    const schema = Joi.object({
        name: Joi.string().min(1).required(),
        address: Joi.string().min(1).required(),
        phone: Joi.string().min(10).max(11).required()
    })

    try {
        const { name, address, phone } = await schema.validateAsync(req.body)

        const isClient = await db.query('SELECT * FROM clients WHERE name = $1', [name])
        if (isClient.rowCount > 0) return res.sendStatus(409)

        const newClient = await db.query('INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3) RETURNING *', [name, address, phone])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getClientsOrders (req, res){
    const id = req.params.id

    try {
        const isClient = await db.query('SELECT * FROM clients WHERE id = $1', [id])
        if (!isClient) return res.sendStatus(404)

        const query = `
        SELECT
            orders.id AS "orderId",
            orders.quantity,
            orders.createdAt,
            orders.totalPrice,
            cakes.name AS "cakeName"
        FROM
            orders
            JOIN cakes ON orders.cakeId = cakes.id
        WHERE
            orders.clientId = $1
        ORDER BY
            orders.createdAt DESC
        `

        const result = await db.query(query, [id])
        const orders = result.rows

        return res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
}