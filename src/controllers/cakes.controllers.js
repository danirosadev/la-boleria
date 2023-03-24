import db from "../config/database.connection.js";
import Joi from "joi";

export async function postNewCake (req, res) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        price: Joi.number().positive().required(),
        description: Joi.string().allow(''),
        image: Joi.string().uri().required()
    })

    try {
        const { name, price, description, image} = await schema.validateAsync(req.body)

        const isCake = await db.query('SELECT * FROM cakes WHERE name = $1', [name])
        if (isCake.rowCount > 0) return res.sendStatus(409)
        
        const newCake = await db.query('INSERT INTO cakes (name, price, description, image) VALUES ($1, $2, $3, $4) RETURNING *', [name, price, description, image])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}