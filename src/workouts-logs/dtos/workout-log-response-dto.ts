import { WorkoutLog } from '../interfaces/workout-log';

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
  category: string;
  order: number;
  originalExerciseId: string | null;
  sets: WorkoutLogSetResponseDTO[];
}

export class WorkoutLogResponseDTO {
  id: string;
  name: string;
  description: string | null;
  workoutTemplateId: string | null;
  exercises: WorkoutLogExerciseResponseDTO[];
  createdAt: Date;
  updatedAt: Date;

  static from(data: WorkoutLog): WorkoutLogResponseDTO {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      workoutTemplateId: data.workoutTemplateId,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      exercises: data.workoutLogExercises.map((exercise) => ({
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
