import { connectionDB } from "../database/db.js";
import { rentalsSchema } from "../schemas/rentals.schema.js";

export async function rentalsValidation(req, res, next) {
  try {
    
    const { error, value } = rentalsSchema.validate(req.body);

    if (error !== undefined) {
      res.sendStatus(400);
      return;
    }

    
    const gameIdExiste = await connectionDB.query(
        "SELECT id FROM games WHERE id=$1",
        [value.gameId]
      );
      console.log(gameIdExiste.rowCount)
      if(gameIdExiste.rowCount === 0){
        res.status(409).send("Esse jogo não existe!")
        return
      }

      const customerIdExiste = await connectionDB.query(
        "SELECT id FROM customers WHERE id=$1",
        [value.customerId]
      );
      console.log(customerIdExiste.rowCount)
      if(customerIdExiste.rowCount === 0){
        res.status(409).send("Esse cliente não existe!")
        return
      }

      const gameDisponivel = await connectionDB.query(
        'SELECT "stockTotal" FROM games WHERE id=$1',
        [value.gameId]
      );
      console.log(gameDisponivel.rows[0].stockTotal)
      if(gameDisponivel.rows[0].stockTotal === 0){
        res.status(409).send("Esse jogo não está disponível!")
        return
      }

   
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function finishRentalValidation(req, res, next) {

    try {
    
        const { error, value } = rentalsSchema.validate(req.body);
    
        if (error !== undefined) {
          res.sendStatus(400);
          return;
        }
        const {id} = req.params


        const rentalIdExiste = await connectionDB.query(
            "SELECT id FROM rentals WHERE id = $1",
            [id]
        );
        console.log(rentalIdExiste.rowCount)
        if(rentalIdExiste.rowCount === 0){
            res.status(409).send("Esse aluguel não existe!")
            return
          }

          const aluguelJáFoiFeito = await connectionDB.query(
            'SELECT "delayFee" FROM rentals WHERE id = $1',
            [id]
        );
        console.log(`ESSE é ${aluguelJáFoiFeito.rows[0].delayFee}`)
        if(aluguelJáFoiFeito.rows[0].delayFee !== null){
            res.status(409).send("Esse aluguel já foi feito!")
            return
          }



       
        next();
      } catch (err) {
        console.log(err);
        res.sendStatus(500);
      }

}