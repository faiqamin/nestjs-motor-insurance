import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Motor Insurance API')
    .setDescription('API documentation for Motor Insurance System')
    .setVersion('1.0')
    .addBearerAuth() // Add if your API uses token-based authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000); // Adjust the port as necessary
}
bootstrap();
