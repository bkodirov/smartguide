const Joi = require('joi');

const schema = Joi.object({
  id: Joi.string().min(1).max(100),
  tags: Joi.array().items(Joi.string().min(2).max(12).required()),
  head_node: Joi.link('#node').required(),
})
  .required()
  .id('use_case');

module.exports = {
  validateBody: (body) => schema.validate(body),
  validateId: (id) => Joi.string().min(12).max(30).required().validate(id),
};
