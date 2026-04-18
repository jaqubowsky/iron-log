import { PrismaService } from 'src/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { WorkoutTemplate } from '../interfaces/workout-template';
import { CreateWorkoutTemplateDTO } from '../dtos/create-workout-template-dto';
import { UpdateWorkoutTemplateDTO } from '../dtos/update-workout-template-dto';

@Injectable()
export class PrismaWorkoutRepository implements WorkoutRepository {
  constructor(private prismaService: PrismaService) {}

  findMany({
    cursor,
    take,
  }: {
    cursor?: string;
    take: number;
  }): Promise<WorkoutTemplate[]> {
    return this.prismaService.workoutTemplate.findMany({
      cursor: cursor ? { id: cursor } : undefined,
      take,
      include: {
        exercises: {
          include: { exercise: true },
        },
      },
    });
  }

  findUnique(id: string): Promise<WorkoutTemplate> {
    return this.prismaService.workoutTemplate.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
  }

  create(
    data: CreateWorkoutTemplateDTO,
    userId: string,
  ): Promise<WorkoutTemplate> {
    const { exercises, ...rest } = data;

    return this.prismaService.workoutTemplate.create({
      data: {
        ...rest,
        userId,
        exercises: {
          create: exercises,
        },
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
  }

  async update({
    id,
    data,
  }: {
    id: string;
    data: UpdateWorkoutTemplateDTO;
  }): Promise<WorkoutTemplate> {
    const { exercises, ...rest } = data;

    if (!exercises) {
      const result = await this.prismaService.workoutTemplate.update({
        where: { id },
        data: { ...rest },
        include: {
          exercises: {
            include: {
              exercise: true,
            },
          },
        },
      });

      return result;
    }

    const deleteExistingExercisesPromise =
      this.prismaService.workoutTemplate.update({
        where: {
          id,
        },
        data: {
          exercises: {
            deleteMany: {},
          },
        },
      });

    const updateWorkoutTemplateWithNewDataPromise =
      this.prismaService.workoutTemplate.update({
        where: {
          id,
        },
        data: {
          ...rest,
          exercises: {
            create: exercises,
          },
        },
        include: {
          exercises: {
            include: { exercise: true },
          },
        },
      });

    const updateResult = await this.prismaService.$transaction([
      deleteExistingExercisesPromise,
      updateWorkoutTemplateWithNewDataPromise,
    ]);

    return updateResult[1];
  }

  delete(id: string): Promise<WorkoutTemplate> {
    return this.prismaService.workoutTemplate.delete({
      where: { id },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
      },
    });
  }
}
