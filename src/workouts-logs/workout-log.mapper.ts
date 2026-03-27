import { ExerciseDTO } from 'src/exercises/dtos/exercise-dto';
import { CreateWorkoutLogDTO } from './dtos/create-workout-log-dto';
import { CreateWorkoutLogPayload } from './interfaces/create-workout-log-payload';
import { UpdateWorkoutLogPayload } from './interfaces/update-workout-log-payload';
import { UpdateWorkoutLogDTO } from './dtos/update-workout-log-dto';

export class WorkoutLogMapper {
  static toExercisesPayload(
    dto: CreateWorkoutLogDTO | UpdateWorkoutLogDTO,
    exercises: ExerciseDTO[],
  ): CreateWorkoutLogPayload['exercises'] {
    return dto.exercises.map((exercise) => {
      const original = exercises.find((e) => e.id === exercise.exerciseId)!;

      return {
        name: original.name,
        description: original.description,
        order: exercise.order,
        originalExerciseId: original.id,
        category: original.category,
        sets: exercise.sets.map((set) => ({
          reps: set.reps,
          weight: set.weight,
          order: set.order,
          rpe: set.rpe,
          notes: set.notes ?? null,
        })),
      };
    });
  }

  static toCreatePayload(
    dto: CreateWorkoutLogDTO,
    exercises: ExerciseDTO[],
    params: {
      name: string;
      description: string | null;
      workoutTemplateId?: string;
    },
  ): CreateWorkoutLogPayload {
    return {
      name: params.name,
      description: params.description,
      workoutTemplateId: params.workoutTemplateId,
      exercises: WorkoutLogMapper.toExercisesPayload(dto, exercises),
    };
  }

  static toUpdatePayload(
    dto: UpdateWorkoutLogDTO,
    exercises: ExerciseDTO[],
  ): UpdateWorkoutLogPayload {
    return {
      exercises: WorkoutLogMapper.toExercisesPayload(dto, exercises),
    };
  }
}
