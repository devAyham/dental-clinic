import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

import { join } from 'path';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 1000 }));
  app.enableCors();
  // app.useStaticAssets(join(__dirname, '..', 'public'));
  // app.use('/upload', express.static(join(__dirname, '..', 'upload')));

  // await app.listen(3000,);
  await app.listen(3000, '0.0.0.0');

}
bootstrap();
