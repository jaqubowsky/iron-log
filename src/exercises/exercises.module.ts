import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { PrismaExerciseRepository } from './respositories/prisma-exercise.repository';
import { ExerciseRepository } from './respositories/exercise.repository';
import { ExercisesService } from './exercises.service';

@Module({
  controllers: [ExercisesController],
  providers: [
    ExercisesService,
    {
      provide: ExerciseRepository,
      useClass: PrismaExerciseRepository,
    },
  ],
})
export class ExercisesModule {}
