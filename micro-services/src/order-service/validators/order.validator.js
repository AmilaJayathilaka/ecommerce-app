import Joi from "joi";

export const createValidator = Joi.object({
  orderDescription: Joi.string().trim().max(100).required(),
  products: Joi.array().items(Joi.number()).min(1).required()
});

export const updateValidator = Joi.object({
  orderDescription: Joi.string().trim().max(100).required(),
  products: Joi.array().items(Joi.number()).min(1).required()
});
