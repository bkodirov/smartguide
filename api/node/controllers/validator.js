const Joi = require('joi');

const schema = Joi.object({
  _id: Joi.string().min(12).max(40),
  use_case_id: Joi.string().min(12).max(40).required(),
  parent_node_id: Joi.string().min(12).max(40),
  parent_answer_id: Joi.string().min(12).max(40),
  question: Joi.object({
    explanation: Joi.string().allow(''),
    question_text: Joi.string().required(),
    tags: Joi.array().items(Joi.string().min(2).max(12)),
    answers: Joi.array().items(Joi.object({
      _id: Joi.string().min(12).max(40),
      text: Joi.string().required(),
      node_id: Joi.string().min(12).max(40),
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
  validateId: (id) => Joi.string().min(12).max(40).required().validate(id),
  nodeSchema: schema
};
