import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { WorkoutLogExerciseSetDTO } from './workout-log-set-exercise-dto';
import { Type } from 'class-transformer';

export class WorkoutLogExerciseDTO {
  @IsUUID('all')
  exerciseId: string;

  @IsInt()
  @Min(1)
  order: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => WorkoutLogExerciseSetDTO)
  sets: WorkoutLogExerciseSetDTO[];
}
