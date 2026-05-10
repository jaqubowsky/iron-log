import { ExerciseCategory } from 'src/exercises';

interface WorkoutLogExerciseSet {
  reps: number;
  weight: number;
  rpe: number;
  order: number;
  notes: string | null;
}

export interface WorkoutLogExercise {
  name: string;
  description: string | null;
  order: number;
  originalExerciseId: string | null;
  category: ExerciseCategory;
  sets: WorkoutLogExerciseSet[];
}

export interface CreateWorkoutLogPayload {
  workoutTemplateId?: string;
  name: string;
  description: string | null;
  exercises: WorkoutLogExercise[];
}
