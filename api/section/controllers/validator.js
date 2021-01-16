const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  tags: Joi.array().items(Joi.string().min(2).max(12)),
  cards: Joi.array().items(Joi.link('#card')).required(),
}).required();

module.exports = {
  validateBody: (body) => schema.validate(body),
  validateId: (id) => Joi.string().min(12).max(30).required().validate(id),
};
