import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { WorkoutLog } from '../interfaces/workout-log';
import { WorkoutLogRepository } from './workout-log.repository';
import { CreateWorkoutLogPayload } from '../interfaces/create-workout-log-payload';
import { UpdateWorkoutLogPayload } from '../interfaces/update-workout-log-payload';

@Injectable()
export class PrismaWorkoutLogRepository implements WorkoutLogRepository {
  constructor(private prismaService: PrismaService) {}

  findMany({
    cursor,
    take,
  }: {
    cursor?: string;
    take: number;
  }): Promise<WorkoutLog[]> {
    return this.prismaService.workoutLog.findMany({
      cursor: cursor ? { id: cursor } : undefined,
      take,
      include: {
        workoutLogExercises: {
          include: {
            sets: true,
          },
        },
      },
    });
  }

  findUnique(id: string): Promise<WorkoutLog> {
    return this.prismaService.workoutLog.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        workoutLogExercises: {
          include: {
            sets: true,
          },
        },
      },
    });
  }

  async create(data: CreateWorkoutLogPayload): Promise<WorkoutLog> {
    const workoutLog = await this.prismaService.workoutLog.create({
      data: {
        name: data.name,
        description: data.description,
        workoutTemplateId: data.workoutTemplateId,
        workoutLogExercises: {
          create: data.exercises.map((exercise) => ({
            ...exercise,
            sets: {
              create: exercise.sets,
            },
          })),
        },
      },
      include: {
        workoutLogExercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    return workoutLog;
  }

  async update({
    id,
    data,
  }: {
    id: string;
    data: UpdateWorkoutLogPayload;
  }): Promise<WorkoutLog> {
    const deleteExistingExercisesPromise = this.prismaService.workoutLog.update(
      {
        where: {
          id,
        },
        data: {
          workoutLogExercises: {
            deleteMany: {},
          },
        },
      },
    );

    const updateWorkoutLogWithNewDataPromise =
      this.prismaService.workoutLog.update({
        where: {
          id,
        },
        data: {
          workoutLogExercises: {
            create: data.exercises.map((exercise) => ({
              ...exercise,
              sets: {
                create: exercise.sets,
              },
            })),
          },
        },
        include: {
          workoutLogExercises: {
            include: {
              sets: true,
            },
          },
        },
      });

    const updateResult = await this.prismaService.$transaction([
      deleteExistingExercisesPromise,
      updateWorkoutLogWithNewDataPromise,
    ]);

    return updateResult[1];
  }

  async delete(id: string) {
    return await this.prismaService.workoutLog.delete({
      where: { id },
      include: {
        workoutLogExercises: {
          include: {
            sets: true,
          },
        },
      },
    });
  }
}
