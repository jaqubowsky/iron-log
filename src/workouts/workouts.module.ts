import { Module } from '@nestjs/common';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { ExercisesModule } from 'src/exercises/exercises.module';
import { WorkoutRepository } from './repositories/workout.repository';
import { PrismaWorkoutRepository } from './repositories/prisma-workout.repository';
import { WorkoutTemplateOwnershipGuard } from './guards/workout-template-ownership.guard';

@Module({
  controllers: [WorkoutsController],
  providers: [
    WorkoutTemplateOwnershipGuard,
    WorkoutsService,
    {
      provide: WorkoutRepository,
      useClass: PrismaWorkoutRepository,
    },
  ],
  imports: [ExercisesModule],
  exports: [WorkoutsService],
})
export class WorkoutsModule {}
