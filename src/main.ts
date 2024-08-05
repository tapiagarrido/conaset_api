import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('conaset');
  
  const configDoc = new DocumentBuilder()
  .setTitle('Next-Conaset API')
  .setDescription("Documentacion Api de intercomunicacion entre SGM2 y la nueva version de la api de Conaset")
  .setVersion('1.0')
  .addTag('Documentación Endpoints y Variables')
  .build();
  
  const document = SwaggerModule.createDocument(app, configDoc);
  SwaggerModule.setup('conaset/v1/docs', app, document);
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(envs.PORT);
}
bootstrap();
