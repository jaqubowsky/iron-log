import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { WorkoutLog, WorkoutLogSimple } from '../interfaces/workout-log';
import { WorkoutLogRepository } from './workout-log.repository';
import { CreateWorkoutLogPayload } from '../interfaces/create-workout-log-payload';
import { UpdateWorkoutLogPayload } from '../interfaces/update-workout-log-payload';
import { PrismaWorkoutLogMapper } from './prisma-workout-log.mapper';

@Injectable()
export class PrismaWorkoutLogRepository implements WorkoutLogRepository {
  constructor(private prismaService: PrismaService) {}

  async findMany({
    cursor,
    take,
  }: {
    cursor?: string;
    take: number;
  }): Promise<WorkoutLogSimple[]> {
    const workoutLogsSimple = await this.prismaService.workoutLog.findMany({
      cursor: cursor ? { id: cursor } : undefined,
      take,
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        workoutLogExercises: {
          orderBy: {
            order: 'asc',
          },
          select: {
            category: true,
            _count: { select: { sets: true } },
          },
        },
      },
    });

    return workoutLogsSimple.map((log) =>
      PrismaWorkoutLogMapper.toWorkoutLogSimple(log),
    );
  }

  async findUnique(id: string): Promise<WorkoutLog | null> {
    const workoutLog = await this.prismaService.workoutLog.findUnique({
      where: {
        id,
      },
      include: {
        workoutLogExercises: {
          orderBy: {
            order: 'asc',
          },
          include: {
            sets: {
              orderBy: {
                order: 'asc',
              },
            },
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!workoutLog) {
      return null;
    }

    return PrismaWorkoutLogMapper.toWorkoutLog(workoutLog);
  }

  async create(
    data: CreateWorkoutLogPayload,
    userId: string,
  ): Promise<WorkoutLog> {
    const workoutLog = await this.prismaService.workoutLog.create({
      data: {
        name: data.name,
        description: data.description,
        workoutTemplateId: data.workoutTemplateId,
        userId,
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
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    return PrismaWorkoutLogMapper.toWorkoutLog(workoutLog);
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
          user: {
            select: {
              id: true,
            },
          },
        },
      });

    const updateResult = await this.prismaService.$transaction([
      deleteExistingExercisesPromise,
      updateWorkoutLogWithNewDataPromise,
    ]);

    const workoutLog = updateResult[1];
    return PrismaWorkoutLogMapper.toWorkoutLog(workoutLog);
  }

  async delete(id: string) {
    const workoutLog = await this.prismaService.workoutLog.delete({
      where: { id },
      include: {
        workoutLogExercises: {
          include: {
            sets: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    return PrismaWorkoutLogMapper.toWorkoutLog(workoutLog);
  }
}
