import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove any other properties that are not in the DTO
      forbidNonWhitelisted: true, // throw an error if there are extra properties
      transform: true, // transform the incoming data to match
      transformOptions: {
        enableImplicitConversion: true, // convert the incoming data to the type defined in the DTO 
      },
    }),
  );

  // Swagger Configuration

  const config = new DocumentBuilder()
    .setVersion('1.0')
    .setTitle('NestJS API')
    .setDescription('The NestJS API description')
    .addServer(`http://localhost:${process.env.PORT ?? 3000}`)
    .addApiKey({ type: 'apiKey', in: 'header', name: 'Authorization' })
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.enableCors(); // enable cors for the app to be accessible from any origin
  await app.listen(process.env.PORT);
}

bootstrap().then(() => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
