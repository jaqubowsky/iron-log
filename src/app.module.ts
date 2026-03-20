import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { PrismaModule } from './db/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaExceptionFilter } from './db/prisma-exception.filter';

@Module({
  imports: [ExercisesModule, PrismaModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'PRISMA_FILTER', useClass: PrismaExceptionFilter },
  ],
})
export class AppModule {}
