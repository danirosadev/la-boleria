import { findCakeRepository, findFlavourRepository, postCake } from "../repositories/cakesRepositories.js";
import cakeSchema from "../schemas/cakeSchema.js";

export async function postNewCake (req, res) {

    try {
        const { name, price, description, image, flavourId} = await cakeSchema.validateAsync(req.body)

        const isCake = await findCakeRepository(name)
        if (isCake.rowCount > 0) return res.sendStatus(409)

        const isFlavour = await findFlavourRepository(flavourId)
        if (isFlavour.rowCount === 0) return res.sendStatus(404)
        
        await postCake(name, price, description, image, flavourId)
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}