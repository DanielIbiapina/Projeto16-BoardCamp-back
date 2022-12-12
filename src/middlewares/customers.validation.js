import { customersSchema } from "../schemas/customers.schema.js";

export async function customersValidation(req, res, next) {
  try {
    
    const { error } = customersSchema.validate(req.body);

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