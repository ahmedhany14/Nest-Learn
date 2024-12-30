import {registerAs}  from "@nestjs/config";

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expiresIn: parseInt(process.env.JWT_EXPIRES_IN ?? '3600', 10),
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
}));