import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { WorkoutLogExerciseDTO } from './workout-log-exercise-dto';

export class CreateWorkoutLogDTO {
  @IsOptional()
  @IsUUID()
  workoutTemplateId?: string;

  @ValidateIf((o: CreateWorkoutLogDTO) => !o.workoutTemplateId)
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => WorkoutLogExerciseDTO)
  exercises: WorkoutLogExerciseDTO[];
}
