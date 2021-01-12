const Joi = require('joi');

const schema = Joi.object({
  id: Joi.array().items(Joi.string().min(2).max(200)),
  title: Joi.string().min(2).max(255),
  type: Joi.string().min(2).max(255),
  tags: Joi.array().items(Joi.string().min(2).max(12)),
  cards: Joi.array().items(Joi.link('/')),
  use_cases: Joi.array().items(Joi.link('#use_case')),
})
  .required()
  .id('card');


module.exports = {
  validateBody: (body) => schema.validate(body),
  validateId: (id) => Joi.string().min(12).max(30).required().validate(id),
};