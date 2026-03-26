import { ExerciseDTO } from 'src/exercises/dtos/exercise-dto';

export class WorkoutTemplateDTO {
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
