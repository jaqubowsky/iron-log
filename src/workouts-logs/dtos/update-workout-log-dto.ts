import { OmitType } from '@nestjs/mapped-types';
import { CreateWorkoutLogDTO } from './create-workout-log-dto';
import { IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { WorkoutLogExerciseDTO } from './workout-log-exercise-dto';

export class UpdateWorkoutLogDTO extends OmitType(CreateWorkoutLogDTO, [
  'workoutTemplateId',
  'name',
  'description',
] as const) {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WorkoutLogExerciseDTO)
  exercises: WorkoutLogExerciseDTO[];
}
