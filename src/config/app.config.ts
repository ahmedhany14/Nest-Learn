import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
  apiVersion: process.env.API_VERSION || '1.0',

  // mail
  mailHost: process.env.MAILER_HOST,
  mailPort: process.env.MAILER_PORT,
  mailUser: process.env.MAILER_USER,
  mailPassword: process.env.MAILER_PASSWORD,
}));