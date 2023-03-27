import Joi from "joi";
import db from "../config/database.connection.js";
import { findCakeByIdRepository, findClientByIdRepository, getOrderByIdRepository, postOrderRepository } from "../repositories/ordersRepositories.js";

export async function postNewOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body

    try {
       const isClient = await findClientByIdRepository(clientId)
       if (isClient.rows.length === 0) return res.status(404).send("Client not found")
       
       const isCake = await findCakeByIdRepository(cakeId)
       if (isCake.rows.length === 0) return res.status(404).send("Cake not found")

       await postOrderRepository(clientId, cakeId, quantity, totalPrice)
       res.sendStatus(201) 
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getOrders (req, res){
    try {
        const schema = Joi.object({
            date: Joi.date()
        })
    
        const { error } = schema.validate(req.query)
        if (error) return res.sendStatus(400)
    
        let query = `
        SELECT
            clients.id as client_id,
            clients.name as client_name,
            clients.address as client_address,
            clients.phone as client_phone,
            cakes.id as cake_id,
            cakes.name as cakes_name,
            cakes.price as cakes_price,
            cakes.description as cake_description,
            orders.created_at,
            orders.quantity,
            orders.total_price
        FROM
            orders
            JOIN clients ON orders.client_id = clients.id
            JOIN cakes ON orders.cake_id = cakes.id
        `
    
        if (req.query.date) {
            query =+ ` WHERE DATE(orders.created_At) = '${req.query.date}'`
        }
    
        const { rows } = await db.query(query)
        if (rows.length === 0) return res.sendStatus(404)
    
        const orders = rows.map((order) => ({
            client: {
                id: order.client_id,
                name: order.client_name,
                address: order.client_address,
                phone: order.client_phone,
            },
            cake: {
                id: order.cake_id,
                name: order.cake_name,
                price: order.cake_price,
                description: order.cake_description,
                image: order.cake_image,
            },
            createdAt: order.created_at,
            quantity: order.quantity,
            totalPrice: order.total_price
        }))
    
        res.status(200).send(orders)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getOrderById (req, res) {
    try {
        const orderId = req.params.id
        const result = await getOrderByIdRepository(orderId)
        if (result.rows.length === 0) return res.sendStatus(404)

        const { id, name, address, phone } = result.rows[0]
        const client = { id, name, address, phone }

        const { cake_id, quantity, total_price, created_at, name: cakeName, price, description, image } = result.rows[0]
        const cake = { id: cake_id, name: cakeName, price, description, image }

        const order = { client, cake, createdAt: created_at, quantity, totalPrice: total_price }
        res.send(order)
    } catch (error) {
        res.status(500).send(error.message)
    }
}