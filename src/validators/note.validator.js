import Joi from '@hapi/joi';

export const newNoteValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(4).required(),
    color: Joi.string().min(3).optional(),
    isArchived: Joi.string().optional(),
    isTrash:Joi.string().optional()
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};