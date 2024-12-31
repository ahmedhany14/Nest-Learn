import {registerAs}  from "@nestjs/config";
import * as process from "node:process";

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: parseInt(process.env.JWT_EXPIRES_IN ?? '3600', 10),
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
  refreshToken: parseInt(process.env.JWT_REFRESH_EXPIRES_IN ?? '86000', 10),
}));