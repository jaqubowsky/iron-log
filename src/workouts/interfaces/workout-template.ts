import { ExerciseCategory } from 'src/exercises/dtos/exercise-dto';

export interface WorkoutTemplateExercise {
  id: string;
  name: string;
  description: string | null;
  category: ExerciseCategory;
  order: number;
}

export class WorkoutTemplate {
  id: string;
  name: string;
  userId: string;
  description: string | null;
  exercises: WorkoutTemplateExercise[];
  createdAt: Date;
  updatedAt: Date;
}
