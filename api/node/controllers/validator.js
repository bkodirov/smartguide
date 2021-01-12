const Joi = require('joi');

const schema = Joi.object({
  use_case_id: Joi.string().min(12).max(30).required(),
  question: Joi.object({
    explanation: Joi.string().allow(''),
    question_text: Joi.string().required(),
    tags: Joi.array().items(Joi.string().min(2).max(12)),
    answers: Joi.array().items(Joi.object({
      text: Joi.string().required(),
      node: Joi.link('/').allow(null),
    }).optional())
  }),
  conclusion: Joi.object({
    text: Joi.string().required(),
    links: Joi.array().items(Joi.object({
      text: Joi.string().required(),
      link: Joi.string().uri().required(),
    }).required()),
    tags: Joi.array().items(Joi.string().min(2).max(12)),
  }),
})
  .required().xor('conclusion', 'question')
  .id('node');


module.exports = {
  validateBody: (body) => schema.validate(body),
  validateId: (id) => Joi.string().min(12).max(30).required().validate(id),
  nodeSchema: schema
};
