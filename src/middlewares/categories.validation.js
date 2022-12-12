import { categoriesSchema } from "../schemas/categories.schema.js";

export async function categoriesValidation(req, res, next) {
  try {
    
    const { error } = categoriesSchema.validate(req.body);

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