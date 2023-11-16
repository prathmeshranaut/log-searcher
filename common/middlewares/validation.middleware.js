const Joi = require('@hapi/joi');

const schema = Joi.object({
  file_name: Joi.string().required(),
  line_count: Joi.number().integer().min(1).max(50).default(10),
  query: Joi.string().allow('').optional(),
});

exports.validateSearch = (req, res, next) => {
  const {error} = schema.validate(req.body);

  if (error) {
    return res.status(400).json({error: error.details[0].message});
  }

  next();
};
