import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { PrismaModule } from './db/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaExceptionFilter } from './db/prisma-exception.filter';
import { WorkoutsModule } from './workouts/workouts.module';

@Module({
  imports: [
    ExercisesModule,
    PrismaModule,
    ConfigModule.forRoot(),
    WorkoutsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'APP_FILTER', useClass: PrismaExceptionFilter },
  ],
})
export class AppModule {}
