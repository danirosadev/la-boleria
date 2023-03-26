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