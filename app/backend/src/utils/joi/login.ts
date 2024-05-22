import * as Joi from 'joi';

const minResponse = 'UNAUTHORIZED|Invalid email or password';

const joiValidateLogin = (input: Record<string, string>) => {
  const schema = Joi.object().keys({
    email: Joi.string().email().min(3).required()
      .messages({
        'any.required': 'INVALID_DATA|All fields must be filled',
        'string.email': 'UNAUTHORIZED|Invalid email or password',
      }),
    password: Joi.string().min(6).required().messages({
      'any.required': 'INVALID_DATA|All fields must be filled',
      'string.min': minResponse,
    }),
  });
  return schema.validate(input);
};

export default joiValidateLogin;
