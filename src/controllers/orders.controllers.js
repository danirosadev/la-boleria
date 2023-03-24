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