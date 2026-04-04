import { ExerciseDTO } from 'src/exercises/dtos/exercise-dto';

export class WorkoutTemplate {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  exercises: {
    order: number;
    exercise: ExerciseDTO;
  }[];
}
