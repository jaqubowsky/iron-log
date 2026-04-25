import { Prisma } from 'prisma/generated/prisma/client';
import { WorkoutLog, WorkoutLogSimple } from '../interfaces/workout-log';

type PrismaWorkoutLogWithExercises = Prisma.WorkoutLogGetPayload<{
  include: {
    workoutLogExercises: {
      include: { sets: true };
    };
    user: {
      select: {
        id: true;
      };
    };
  };
}>;

type PrismaWorkoutLogSimple = Prisma.WorkoutLogGetPayload<{
  select: {
    id: true;
    name: true;
    description: true;
    createdAt: true;
    updatedAt: true;
    workoutLogExercises: {
      select: {
        category: true;
        _count: { select: { sets: true } };
      };
    };
  };
}>;

export class PrismaWorkoutLogMapper {
  static toWorkoutLog(raw: PrismaWorkoutLogWithExercises) {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      templateId: raw.workoutTemplateId,
      userId: raw.user.id,
      exercises: raw.workoutLogExercises.map((ex) => ({
        id: ex.id,
        name: ex.name,
        description: ex.description,
        category: ex.category,
        order: ex.order,
        originalExerciseId: ex.originalExerciseId,
        sets: ex.sets.map((set) => ({
          id: set.id,
          weight: set.weight,
          reps: set.reps,
          rpe: set.rpe,
          order: set.order,
          notes: set.notes,
        })),
      })),
    } satisfies WorkoutLog;
  }

  static toWorkoutLogSimple(raw: PrismaWorkoutLogSimple) {
    return {
      id: raw.id,
      name: raw.name,
      description: raw.description,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
      exercises: raw.workoutLogExercises.map((ex) => ({
        category: ex.category,
        setsCount: ex._count.sets,
      })),
    } satisfies WorkoutLogSimple;
  }
}
