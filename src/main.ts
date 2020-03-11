import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle('Bible API')
        .setDescription('This is a free bible api')
        .setVersion('1.0')
        .addTag('Bible API')
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('', app, document, {
        customSiteTitle: 'Free bible API'
    });

    await app.listen(3000);
}
bootstrap();
