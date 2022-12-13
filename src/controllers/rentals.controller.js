import { connectionDB } from "../database/db.js";
import dayjs from 'dayjs'

export async function getRentals(req, res){
    try{
        const rentals = await connectionDB.query('SELECT rentals.*, customers.id, customers.name  FROM rentals JOIN customers ON rentals."customerId"  = customers.id;');
        res.send(rentals.rows)
    }catch (err) {
        res.status(500).send(err.message);
    }
}



export async function postRentals(req, res){
    
    const {customerId, gameId, daysRented} = req.body
    const rentDate = dayjs()
    const returnDate = null
    
    const delayFee = null
    
try{
    const getPreco = await connectionDB.query('SELECT "pricePerDay" FROM games WHERE  games.id = $1', [gameId])
    console.log(getPreco.rows[0].pricePerDay)
    const preco = getPreco.rows[0].pricePerDay

    const originalPrice = daysRented * preco

    await connectionDB.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);', [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee])
    res.sendStatus(201)
}catch (err) {
    res.status(500).send(err.message);
}
}