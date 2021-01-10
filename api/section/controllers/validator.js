const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().min(1).max(255).required(),
  tags: Joi.array().items(Joi.string().min(2).max(12)),
  cards: Joi.array().items(Joi.link('#card')),
}).required();

module.exports = {
  validateBody: (body) => schema.validate(body),
  validateId: (id) => Joi.string().uuid().required().validate(id),
};
