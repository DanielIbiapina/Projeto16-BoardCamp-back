import { connectionDB } from "../database/db.js";

export async function getRentals(req, res){
    try{
        const rentals = await connectionDB.query("SELECT * FROM rentals;");
        res.send(rentals.rows)
    }catch (err) {
        res.status(500).send(err.message);
    }
}