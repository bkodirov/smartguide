const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().min(1).max(100).required(),
  tags: Joi.array().items(Joi.string().min(2).max(12).required()),
  cards: Joi.array().items(Joi.string().uuid().min(2).max(12).required()),
  parent_card_id: Joi.string().uuid().min(2).max(12).required(),
});

module.exports = {
  validateBody: (body) => schema.validate(body),
  validateId: (id) => Joi.string().uuid().required().validate(id),
};
