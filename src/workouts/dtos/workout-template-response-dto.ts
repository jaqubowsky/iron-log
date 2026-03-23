import { Prisma } from 'prisma/generated/prisma/client';
import { ExerciseCategory } from 'prisma/generated/prisma/enums';

export class WorkoutTemplateResponseDTO {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  exercises: Array<{
    id: string;
    name: string;
    description: string | null;
    order: number;
    category: ExerciseCategory;
    createdAt: Date;
    updatedAt: Date;
  }>;

  constructor(
    data: Prisma.WorkoutTemplateGetPayload<{
      include: { exercises: { include: { exercise: true } } };
    }>,
  ) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.exercises = data.exercises.map(({ exercise, order }) => ({
      id: exercise.id,
      name: exercise.name,
      description: exercise.description,
      order,
      category: exercise.category,
      createdAt: exercise.createdAt,
      updatedAt: exercise.updatedAt,
    }));
  }
}
