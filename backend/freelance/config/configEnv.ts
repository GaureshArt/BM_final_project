import * as dotenv from 'dotenv';
import * as Joi from 'joi';

dotenv.config();


const envSchema = Joi.object({
  PORT: Joi.number().required(),
  TYPE: Joi.string().required(),
  HOST: Joi.string().required(),
  USERNAME: Joi.string().required(),
  PASSWORD: Joi.string().required(),
  DATABASE: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),

  JWT_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),

  CLOUDINARY_NAME: Joi.string().required(),
  CLOUDINARY_API_KEY: Joi.string().required(),
  CLOUDINARY_API_SECRET: Joi.string().required(),
}).unknown(true);


const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}


const config = {
  PORT: parseInt(envVars.PORT, 10),
  TYPE: envVars.TYPE,
  HOST: envVars.HOST,
  USERNAME: envVars.USERNAME,
  PASSWORD: envVars.PASSWORD,
  DATABASE: envVars.DATABASE,
  NODE_ENV: envVars.NODE_ENV,

  JWT_SECRET: envVars.JWT_SECRET,
  JWT_REFRESH_SECRET: envVars.JWT_REFRESH_SECRET,

  CLOUDINARY_NAME: envVars.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: envVars.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: envVars.CLOUDINARY_API_SECRET,
};

export default config;
console.log('Loaded PORT:', process.env.PORT); // Should print: 3306
