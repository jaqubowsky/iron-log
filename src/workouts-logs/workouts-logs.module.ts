import { Module } from '@nestjs/common';
import { WorkoutsLogsController } from './workouts-logs.controller';
import { WorkoutsLogsService } from './workouts-logs.service';
import { WorkoutLogRepository } from './repositories/workout-log.repository';
import { PrismaWorkoutLogRepository } from './repositories/prisma-workout-log.repository';
import { WorkoutsModule } from 'src/workouts/workouts.module';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { WorkoutLogsOwnershipGuard } from './guards/workout-logs-ownership.guard';

@Module({
  controllers: [WorkoutsLogsController],
  providers: [
    WorkoutLogsOwnershipGuard,
    WorkoutsLogsService,
    {
      provide: WorkoutLogRepository,
      useClass: PrismaWorkoutLogRepository,
    },
  ],
  imports: [WorkoutsModule, ExercisesModule],
})
export class WorkoutsLogsModule {}
