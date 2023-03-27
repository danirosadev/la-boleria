import Joi from "joi";

const clientSchema = Joi.object({
    name: Joi.string().min(1).required(),
    address: Joi.string().min(1).required(),
    phone: Joi.string().min(10).max(11).required()
})

export default clientSchema;