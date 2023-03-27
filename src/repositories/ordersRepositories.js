import db from "../config/database.connection.js";

export async function findClientByIdRepository(clientId){
    return db.query('SELECT * FROM clients WHERE id = $1', [clientId])
};

export async function findCakeByIdRepository(cakeId){
    return db.query('SELECT * FROM cakes WHERE id = $1', [cakeId])
};

export async function postOrderRepository(clientId, cakeId, quantity, totalPrice){
    return db.query('INSERT INTO orders (client_id, cake_id, quantity, total_price, created_at) VALUES ($1, $2, $3, $4, $5)', [clientId, cakeId, quantity, totalPrice, new Date()])
};

export async function getOrderByIdRepository(orderId){
    return db.query('SELECT c.*, o.*, cl.* FROM cakes c, orders o, clients cl WHERE o.cake_id = c.id AND o.client_id = cl.id AND o.id = $1', [orderId])
};