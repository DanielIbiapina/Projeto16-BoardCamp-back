import joi from "joi";



export const customersSchema = joi.object({
    name: joi.string().required(),
    cpf: joi.string().min(11).max(11),
    phone: joi.string().min(10).max(11),
    birthday: joi.number(),
})