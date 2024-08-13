import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Configuración de prefijo global
  app.setGlobalPrefix('conaset');

  // Configuración de archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // Configuración de motor de plantillas
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');

  // Configuración de documentación Swagger
  const configDoc = new DocumentBuilder()
    .setTitle('Next-Conaset API')
    .setDescription("Documentación API de intercomunicacion entre SGM2 y la nueva versión de la API de Conaset")
    .setVersion('1.0')
    .addTag('Documentación Endpoints y Variables')
    .build();

  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('conaset/v1/docs', app, document);

  // Configuración de validación global
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(envs.PORT);
}

bootstrap();

