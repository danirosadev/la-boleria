import db from "../config/database.connection.js";
import Joi from "joi";

export async function postNewCake (req, res) {
    const schema = Joi.object({
        name: Joi.string().min(2).required(),
        price: Joi.number().positive().required(),
        description: Joi.string().allow(''),
        image: Joi.string().uri().required(),
        flavourId: Joi.number().integer().required()
    })

    try {
        const { name, price, description, image, flavourId} = await schema.validateAsync(req.body)

        const isCake = await db.query('SELECT * FROM cakes WHERE name = $1', [name])
        if (isCake.rowCount > 0) return res.sendStatus(409)

        const isFlavour = await db.query('SELECT * FROM flavours WHERE id = $1', [flavourId])
        if (isFlavour.rowCount === 0) return res.sendStatus(404)
        
        await db.query('INSERT INTO cakes (name, price, description, image, flavour_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, price, description, image, flavourId])
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}