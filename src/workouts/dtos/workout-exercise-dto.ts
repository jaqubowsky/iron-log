import { IsNumber, IsUUID } from 'class-validator';

export class WorkoutExerciseDTO {
  @IsUUID('all')
  exerciseId: string;

  @IsNumber()
  order: number;
}
