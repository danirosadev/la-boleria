import Joi from "joi";
import db from "../config/database.connection.js";

export async function postNewOrder(req, res) {
    const { clientId, cakeId, quantity, totalPrice } = req.body

    try {
       const isClient = await db.query('SELECT * FROM clients WHERE id = $1', [clientId])
       if (isClient.rows.length === 0) return res.status(404).send("Client not found")
       
       const isCake = await db.query('SELECT * FROM cakes WHERE id = $1', [cakeId])
       if (isCake.rows.length === 0) return res.status(404).send("Cake not found")

       const newOrder = await db.query('INSERT INTO orders (client_id, cake_id, quantity, total_price, created_at) VALUES ($1, $2, $3, $4, $5)', [clientId, cakeId, quantity, totalPrice, new Date()])
       res.sendStatus(201) 
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getOrders (req, res){
    try {
        const schema = Joi.object({
            date: Joi.date().format('YYY-MM-DD')
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
            orders.createdAt,
            orders.quantity,
            orders.totalPrice
        FROM
            orders
            JOIN clients ON orders.clientId = client.id
            JOIN cake ON orders.cakeId - cakes.id
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