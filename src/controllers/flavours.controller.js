import db from "../config/database.connection.js";
import Joi from "joi";

export async function postFlavour (req, res){
    const { name } = req.body
    if (!name || name.length < 2) return res.sendStatus(400)

    const isFlavour = await db.query('SELECT * FROM flavours WHERE LOWER(name) = LOWER($1)', [name])
    if (isFlavour.rows.length > 0) return res.sendStatus(409)

    try {
        await db.query('INSERT INTO flavours (name) VALUES ($1)', [name])
        return res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}