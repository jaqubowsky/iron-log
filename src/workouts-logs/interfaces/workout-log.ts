import { ExerciseCategory } from 'src/exercises/dtos/exercise-dto';

export interface WorkoutLogSet {
  id: string;
  weight: number;
  reps: number;
  rpe: number;
  order: number;
  notes: string | null;
}

export interface WorkoutLogExercise {
  id: string;
  name: string;
  description: string | null;
  category: ExerciseCategory;
  order: number;
  sets: WorkoutLogSet[];
  originalExerciseId: string | null;
}

export interface WorkoutLog {
  id: string;
  name: string;
  description: string | null;
  workoutTemplateId: string | null;
  workoutLogExercises: WorkoutLogExercise[];
  createdAt: Date;
  updatedAt: Date;
}
