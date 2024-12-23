import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // remove any other properties that are not in the DTO
    forbidNonWhitelisted: true, // throw an error if there are extra properties
    transform: true, // transform the incoming data to match
  }));

  // Swagger Configuration

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .addServer('http://localhost:3000')
    .addApiKey({ type: 'apiKey', in: 'header', name: 'Authorization' })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
