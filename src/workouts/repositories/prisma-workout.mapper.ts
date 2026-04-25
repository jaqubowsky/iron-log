import { Prisma } from 'prisma/generated/prisma/client';
import { WorkoutTemplate } from '../interfaces/workout-template';

type PrismaWorkoutTemplateWithExercises = Prisma.WorkoutTemplateGetPayload<{
  include: {
    exercises: {
      include: {
        exercise: true;
      };
    };
    user: {
      select: {
        id: true;
      };
    };
  };
}>;

export class PrismaWorkoutTemplateMapper {
  static toWorkoutTemplate(raw: PrismaWorkoutTemplateWithExercises) {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      exercises: raw.exercises.map(({ order, exercise }) => ({
        id: exercise.id,
        order,
        name: exercise.name,
        category: exercise.category,
        description: exercise.description,
      })),
      userId: raw.user.id,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    } satisfies WorkoutTemplate;
  }
}
