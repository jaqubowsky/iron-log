import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { PrismaModule } from './db/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ExercisesModule, PrismaModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
