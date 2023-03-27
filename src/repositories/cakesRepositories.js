import db from "../config/database.connection.js";

export async function findCakeRepository(name){
    return db.query('SELECT * FROM cakes WHERE name = $1', [name])
};

export async function findFlavourRepository(flavourId){
    return db.query('SELECT * FROM flavours WHERE id = $1', [flavourId])
};

export async function postCake(name, price, description, image, flavourId){
    return db.query('INSERT INTO cakes (name, price, description, image, flavour_id) VALUES ($1, $2, $3, $4, $5) RETURNING *', [name, price, description, image, flavourId])
};