import joi from "joi";



export const rentalsSchema = joi.object({
    customerId: joi.number().integer(),
    gameId: joi.number().integer(),
    daysRented: joi.number().integer().min(1),
})