import {
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class WorkoutLogExerciseSetDTO {
  @IsNumber()
  @Min(0)
  weight: number;

  @IsInt()
  @IsPositive()
  reps: number;

  @IsInt()
  @Min(0)
  @Max(10)
  rpe: number;

  @IsInt()
  @Min(0)
  order: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  notes?: string;
}
