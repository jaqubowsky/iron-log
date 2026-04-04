import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExercisesModule } from './exercises/exercises.module';
import { PrismaModule } from './db/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaExceptionFilter } from './db/prisma-exception.filter';
import { WorkoutsModule } from './workouts/workouts.module';
import { WorkoutsLogsModule } from './workouts-logs/workouts-logs.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ExercisesModule,
    PrismaModule,
    ConfigModule.forRoot(),
    WorkoutsModule,
    WorkoutsLogsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: 'APP_FILTER', useClass: PrismaExceptionFilter },
  ],
})
export class AppModule {}
