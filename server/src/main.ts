import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as multer from 'multer';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const storage = multer.diskStorage({
    destination: './uploads',  // папка для сохранения загруженных файлов
    filename: (req, file, cb) => {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniquePrefix + '-' + file.originalname); // уникальное имя файла
    },
  });
  
  const upload = multer({ storage });

  // app.use('/uploads', express.static('uploads'));
  // app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));
  app.use('/uploads', (req, res, next) => {
    res.type('image/png'); // Замените на соответствующий MIME-тип вашего файла
    next();
  }, express.static(join(__dirname, '..', 'uploads')));

  const config = new DocumentBuilder()
    .setTitle('Sport Sphere')
    .setDescription('API app for sport sphere')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
