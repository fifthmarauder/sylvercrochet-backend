import Joi from "joi";

export const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),

  email: Joi.string().email().required(),

  password: Joi.string().min(6).required(),

  admin: Joi.boolean().optional()
});

export const createNewProductSchema = Joi.object({
  name:Joi.string().required(),
  images: Joi.array().items(Joi.string().uri()).min(1).max(10).required(),
  stock: Joi.boolean().default(true),
  category: Joi.string().required(),
  description:Joi.string().min(5).max(200).required(),
  price: Joi.number().positive().required(),

})