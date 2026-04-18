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
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import * as z from 'zod';
import { JwtAuthGuard } from './auth/guards/jwt-auth-guard';

const validationSchema = z.object({
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRES_IN: z.string().default('15m'),
  REFRESH_EXPIRES_IN_MS: z.coerce.number().default(604800000),
  BCRYPT_COST: z.coerce.number().default(10),
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => validationSchema.parse(config),
    }),
    ExercisesModule,
    PrismaModule,
    WorkoutsModule,
    WorkoutsLogsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: PrismaExceptionFilter },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class AppModule {}
