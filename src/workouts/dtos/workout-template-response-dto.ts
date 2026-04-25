import { WorkoutTemplate } from '../interfaces/workout-template';

export class WorkoutTemplateResponseDTO extends WorkoutTemplate {
  static from(
    data: WorkoutTemplate,
  ): Omit<WorkoutTemplateResponseDTO, 'userId'> {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      exercises: data.exercises.map((exercise) => ({
        id: exercise.id,
        name: exercise.name,
        order: exercise.order,
        description: exercise.description,
        category: exercise.category,
      })),
    };
  }
}
