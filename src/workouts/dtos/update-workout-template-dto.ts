import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateWorkoutTemplateDTO } from './create-workout-template-dto';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { WorkoutExerciseDTO } from './workout-exercise-dto';
import { Type } from 'class-transformer';

export class UpdateWorkoutTemplateDTO extends PartialType(
  OmitType(CreateWorkoutTemplateDTO, ['exercises'] as const),
) {
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => WorkoutExerciseDTO)
  exercises?: WorkoutExerciseDTO[];
}
