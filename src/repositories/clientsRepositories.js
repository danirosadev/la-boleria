import db from "../config/database.connection.js";

export async function findClientByNameRepository(name){
    return db.query('SELECT * FROM clients WHERE name = $1', [name])
};

export async function postClientRepository(name, address, phone){
    return db.query('INSERT INTO clients (name, address, phone) VALUES ($1, $2, $3) RETURNING *', [name, address, phone])
};

export async function findClientByIdReporitory(id){
    return db.query('SELECT * FROM clients WHERE id = $1', [id])
};

export async function getClientOrderRepository(id){
    return db.query(
        `
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
    ), [id]
}