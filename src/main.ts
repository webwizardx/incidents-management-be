import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { API_BEARER_AUTH } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.setGlobalPrefix('/api');

  const config = new DocumentBuilder()
    .addBearerAuth(undefined, API_BEARER_AUTH)
    .setTitle('NestJS template')
    .setDescription('API Docs for NestJS template')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') ?? 3008;

  const logger = new Logger('APP');
  logger.log(`App listening on port: ${PORT}`);

  await app.listen(PORT);
}

bootstrap();
