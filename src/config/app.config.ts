import * as dotenv from 'dotenv';
import { registerAs } from '@nestjs/config';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'production',
}));