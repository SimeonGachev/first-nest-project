import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  app.enableCors({
    origin: ['*'],
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
  });
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
