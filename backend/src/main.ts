import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // Create the NestJS application
  const app = await NestFactory.create(AppModule);

  // Allow frontend (React app) to communicate with backend
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // React Vite default
    credentials: true,
  });

  // Set global prefix for all routes (optional but cleaner)
  app.setGlobalPrefix('api');

  // Global input validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unknown fields
      forbidNonWhitelisted: false, // Don’t throw error for extra fields
      transform: true, // Auto-transform payloads into DTO classes
    }),
  );

  // Swagger API Docs (http://localhost:3000/api/docs)
  const config = new DocumentBuilder()
    .setTitle('Collaborative Task Management API')
    .setDescription(
      'Backend API for Collaborative Task Management Web App (UN Platforms Assignment)',
    )
    .setVersion('1.0')
    .addBearerAuth() // Enable JWT auth in Swagger
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Run the server
  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger Docs: http://localhost:${PORT}/api/docs`);
}

bootstrap();
