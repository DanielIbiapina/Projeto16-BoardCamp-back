import { connectionDB } from "../database/db.js";
import { customersSchema } from "../schemas/customers.schema.js";

export async function customersValidation(req, res, next) {
  try {
    
    const { error, value } = customersSchema.validate(req.body);

    if (error !== undefined) {
      res.sendStatus(400);
      return;
    }

    const cpfExiste = await connectionDB.query(
      "SELECT cpf FROM customers WHERE cpf=$1",
      [value.cpf]
    );
    console.log(cpfExiste.rowCount)
    if(cpfExiste.rowCount > 0){
      res.status(409).send("Esse cpf já existe!")
      return
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}


export async function updateCustomersValidation(req, res, next) {
  const {id} = req.params
  try {
    
    const { error, value } = customersSchema.validate(req.body);

    if (error !== undefined) {
      res.sendStatus(400);
      return;
    }

    const cpfExiste = await connectionDB.query(
      "SELECT cpf FROM customers WHERE cpf=$1 AND id<>$2",
      [value.cpf, id]
    );
    console.log(cpfExiste.rowCount)
    if(cpfExiste.rowCount > 0){
      res.status(409).send("Esse cpf já existe!")
      return
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}