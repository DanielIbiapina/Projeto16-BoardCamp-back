import { connectionDB } from "../database/db.js";
import { gamesSchema } from "../schemas/games.schema.js";

export async function gamesValidation(req, res, next) {
  try {
    
    const { error, value } = gamesSchema.validate(req.body);

    if (error !== undefined) {
      res.sendStatus(400);
      return;
    }

    
    const gameExiste = await connectionDB.query(
        "SELECT name FROM games WHERE name=$1",
        [value.name]
      );
      console.log(gameExiste.rowCount)
      if(gameExiste.rowCount > 0){
        res.status(409).send("Esse jogo já existe!")
        return
      }

   
    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}