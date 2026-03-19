import { IsEnum } from 'class-validator';
import { ExerciseCategory } from 'generated/prisma/enums';

export class CreateExerciseDTO {
  name: string;

  description?: string;

  @IsEnum(ExerciseCategory)
  category: ExerciseCategory;
}
