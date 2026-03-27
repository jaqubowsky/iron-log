import { IsInt, IsUUID, Min } from 'class-validator';

export class WorkoutExerciseDTO {
  @IsUUID('all')
  exerciseId: string;

  @IsInt()
  @Min(0)
  order: number;
}
