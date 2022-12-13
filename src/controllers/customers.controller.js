import { connectionDB } from "../database/db.js";

export async function getCustomers(req, res){
    try{
        const customers = await connectionDB.query("SELECT * FROM customers;");
        res.send(customers.rows)
    }catch (err) {
        res.status(500).send(err.message);
    }
}

export async function getCustomersById(req, res){
    const {id} = req.params;
console.log(id)
    
    try{
        const idExiste = await connectionDB.query("SELECT id FROM customers")
        if(idExiste.rows[id-1] == undefined){
            res.sendStatus(404)
            return
        }

        const customer = await connectionDB.query("SELECT * FROM customers WHERE id = $1;", [id]);
        res.send(customer.rows[0])
    }catch (err) {
        res.status(500).send(err.message);
    }
}

export async function postCustomers(req, res){
    const {name, phone, cpf, birthday} = req.body

try{
    await connectionDB.query("INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);", [name, phone, cpf, birthday])
    res.sendStatus(201)
}catch (err) {
    res.status(500).send(err.message);
}
}

export async function putCustomersById(req, res){
    const {id} = req.params;
    const {name, phone, cpf, birthday} = req.body;

    try{
        await connectionDB.query("UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5;", [name, phone, cpf, birthday, id])
        res.sendStatus(201)
    }catch (err) {
        res.status(500).send(err.message);
    }


}