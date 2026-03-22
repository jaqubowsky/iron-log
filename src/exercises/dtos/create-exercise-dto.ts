import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';
import { ExerciseCategory } from 'prisma/generated/prisma/enums';

export class CreateExerciseDTO {
  @IsNotEmpty()
  @MaxLength(255)
  name: string;

  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsEnum(ExerciseCategory)
  category: ExerciseCategory;
}
