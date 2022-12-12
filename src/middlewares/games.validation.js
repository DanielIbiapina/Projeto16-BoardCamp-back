import { gamesSchema } from "../schemas/games.schema.js";

export async function gamesValidation(req, res, next) {
  try {
    
    const { error } = gamesSchema.validate(req.body);

    if (error !== undefined) {
      res.sendStatus(400);
      return;
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}