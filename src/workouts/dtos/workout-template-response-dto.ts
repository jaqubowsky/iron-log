import { ExerciseDTO } from 'src/exercises/dtos/exercise-dto';
import { WorkoutTemplate } from '../interfaces/workout-template';

class WorkoutExercise extends ExerciseDTO {
  order: number;
}

export class WorkoutTemplateResponseDTO {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  exercises: WorkoutExercise[];

  static from(data: WorkoutTemplate): WorkoutTemplateResponseDTO {
    const dto = new WorkoutTemplateResponseDTO();

    Object.assign(dto, {
      ...data,
      exercises: data.exercises.map(({ exercise, order }) => ({
        id: exercise.id,
        name: exercise.name,
        description: exercise.description,
        order,
        category: exercise.category,
        createdAt: exercise.createdAt,
        updatedAt: exercise.updatedAt,
      })),
    });

    return dto;
  }
}
