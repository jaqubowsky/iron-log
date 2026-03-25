import { Module } from '@nestjs/common';
import { ExercisesController } from './exercises.controller';
import { PrismaExerciseRepository } from './repositories/prisma-exercise.repository';
import { ExerciseRepository } from './repositories/exercise.repository';
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
