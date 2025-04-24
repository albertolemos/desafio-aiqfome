import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

const configService: ConfigService = new ConfigService();
const port: number = configService.get<number>('PORT', 3000);

async function bootstrap() {
  const logger = new Logger(bootstrap.name);
  const app = await NestFactory.create(AppModule, { cors: true });

  const config = new DocumentBuilder()
    .setTitle('Desafio Aiqfome')
    .setDescription(
      'Desafio Aiqfome - Engenheiro(a) de Software SR | APIs e Backoffice | L2L Aiqfome',
    )
    .setVersion('1.0')
    .addTag('aiqfome')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, documentFactory);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  logger.log(`Server is running on port: ${port}`);
}

void bootstrap();
