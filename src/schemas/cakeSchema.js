import Joi from "joi";

const cakeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().allow(''),
    image: Joi.string().uri().required(),
    flavourId: Joi.number().integer().required()
})

export default cakeSchema;