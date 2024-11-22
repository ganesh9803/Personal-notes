import Joi from 'joi';

const noteValidation = Joi.object({
  title: Joi.string().required().messages({
    'any.required': 'Title is required',
  }),
  description: Joi.string().required().messages({
    'any.required': 'Description is required',
  }),
  category: Joi.string().valid('Work', 'Personal', 'Others'),
  completed: Joi.boolean(),
});

export default noteValidation;
