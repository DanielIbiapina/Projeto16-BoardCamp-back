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
if(id == 1){
    res.status(404).send('Não existe esse cliente')
    return
}
    
    try{
        const idExiste = await connectionDB.query("SELECT id FROM customers")
        console.log(idExiste.rows)
        //if(/*fazermap*/){
    //        res.status(404).send('Não existe esse cliente')
     //       return
     //   }
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
}catch (err) {
    res.status(500).send(err.message);
}
}