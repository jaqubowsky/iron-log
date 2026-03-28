import { ExerciseCategory } from 'src/exercises/dtos/exercise-dto';
import { WorkoutLog, WorkoutLogSimple } from '../interfaces/workout-log';

class WorkoutLogSetResponseDTO {
  id: string;
  weight: number;
  reps: number;
  rpe: number;
  order: number;
  notes: string | null;
}

class WorkoutLogExerciseResponseDTO {
  id: string;
  name: string;
  description: string | null;
  category: ExerciseCategory;
  order: number;
  originalExerciseId: string | null;
  sets: WorkoutLogSetResponseDTO[];
}

export class WorkoutLogResponseDTO {
  id: string;
  name: string;
  description: string | null;
  exercises: WorkoutLogExerciseResponseDTO[];
  createdAt: Date;
  updatedAt: Date;

  static from(data: WorkoutLog): WorkoutLogResponseDTO {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      exercises: data.exercises.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
        category: exercise.category,
        order: exercise.order,
        originalExerciseId: exercise.originalExerciseId,
        sets: exercise.sets.map((set) => ({
          id: set.id,
          weight: set.weight,
          reps: set.reps,
          order: set.order,
          rpe: set.rpe,
          notes: set.notes,
        })),
      })),
    };
  }
}

export class WorkoutLogSimpleResponseDTO {
  id: string;
  name: string;
  description: string | null;
  exercises: Array<{
    category: ExerciseCategory;
    setsCount: number;
  }>;
  createdAt: Date;
  updatedAt: Date;

  static from(data: WorkoutLogSimple): WorkoutLogSimpleResponseDTO {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      exercises: data.exercises.map((exercise) => ({
        category: exercise.category,
        setsCount: exercise.setsCount,
      })),
    };
  }
}
