import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DATABASE_NAME: Joi.string().required(),
  DATABASE_USER: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_PORT: Joi.number().port().default(5432),
  DATABASE_HOST: Joi.string().required(),
  DATABASE_SYNCHRONIZE: Joi.boolean().default(true),
  DATABASE_AUTO_LOAD_ENTITIES: Joi.boolean().default(true),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().required(),
  JWT_TOKEN_AUDIENCE: Joi.string().required(),
  JWT_TOKEN_ISSUER: Joi.string().required(),
  GOOGLE_CLIENT_ID: Joi.string().required(),
  GOOGLE_CLIENT_SECRET: Joi.string().required(),

  MAILER_HOST: Joi.string().required(),
  MAILER_PORT: Joi.number().port().required(),
  MAILER_USER: Joi.string().required(),
  MAILER_PASSWORD: Joi.string().required(),
  AWS_PUBLIC_BUCKET_NAME: Joi.string().required(),
  AWS_REGION: Joi.string().required(),
  AWS_CLOUDFRONT_URL: Joi.string().required(),
  AWS_ACCESS_KEY_ID: Joi.string().required(),
  AWS_SECRET_ACCESS_KEY: Joi.string().required(),
});
