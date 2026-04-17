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
import { APP_FILTER } from '@nestjs/core';
import * as z from 'zod';

const validationSchema = z.object({
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  REFRESH_EXPIRES_IN_MS: z.string().default('604800000'),
  BCRYPT_COST: z.coerce.number().default(10),
});

@Module({
  imports: [
    ExercisesModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => validationSchema.parse(config),
    }),
    WorkoutsModule,
    WorkoutsLogsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
  ],
})
export class AppModule {}
