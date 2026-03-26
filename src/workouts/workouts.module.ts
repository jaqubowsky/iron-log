import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { WorkoutRepository } from './repositories/workout.repository';
import { PrismaWorkoutRepository } from './repositories/prisma-workout.repository';

@Module({
  controllers: [WorkoutsController],
  providers: [
    WorkoutsService,
    {
      provide: WorkoutRepository,
      useClass: PrismaWorkoutRepository,
    },
  ],
})
export class WorkoutsModule {}
