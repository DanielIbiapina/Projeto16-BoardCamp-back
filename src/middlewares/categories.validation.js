import { connectionDB } from "../database/db.js";
import { categoriesSchema } from "../schemas/categories.schema.js";

export async function categoriesValidation(req, res, next) {
  try {
    
    const { error, value } = categoriesSchema.validate(req.body);

    if (error !== undefined) {
      res.sendStatus(400);
      return;
    }

    const categoryExiste = await connectionDB.query(
      "SELECT name FROM categories WHERE name=$1",
      [value.name]
    );
    console.log(categoryExiste.rowCount)
    if(categoryExiste.rowCount > 0){
      res.status(409).send("Essa categoria já existe!")
      return
    }

    next();
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}