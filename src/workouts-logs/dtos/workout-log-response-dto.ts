import { WorkoutLog, WorkoutLogSimple } from '../interfaces/workout-log';

export class WorkoutLogResponseDTO extends WorkoutLog {
  static from(data: WorkoutLog): Omit<WorkoutLogResponseDTO, 'userId'> {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      templateId: data.templateId,
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

export class WorkoutLogSimpleResponseDTO extends WorkoutLogSimple {
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
