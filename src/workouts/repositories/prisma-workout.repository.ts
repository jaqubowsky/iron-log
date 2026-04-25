import { PrismaService } from 'src/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { WorkoutRepository } from './workout.repository';
import { WorkoutTemplate } from '../interfaces/workout-template';
import { CreateWorkoutTemplateDTO } from '../dtos/create-workout-template-dto';
import { UpdateWorkoutTemplateDTO } from '../dtos/update-workout-template-dto';
import { PrismaWorkoutTemplateMapper } from './prisma-workout.mapper';

@Injectable()
export class PrismaWorkoutRepository implements WorkoutRepository {
  constructor(private prismaService: PrismaService) {}

  async findMany({
    cursor,
    take,
  }: {
    cursor?: string;
    take: number;
  }): Promise<WorkoutTemplate[]> {
    const result = await this.prismaService.workoutTemplate.findMany({
      cursor: cursor ? { id: cursor } : undefined,
      take,
      include: {
        exercises: {
          include: { exercise: true },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    return result.map((item) =>
      PrismaWorkoutTemplateMapper.toWorkoutTemplate(item),
    );
  }

  async findUnique(id: string): Promise<WorkoutTemplate | null> {
    const result = await this.prismaService.workoutTemplate.findUnique({
      where: {
        id,
      },
      include: {
        exercises: {
          include: {
            exercise: true,
          },
        },
        user: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!result) {
      return null;
    }

    return PrismaWorkoutTemplateMapper.toWorkoutTemplate(result);
  }

  async create(
    data: CreateWorkoutTemplateDTO,
    userId: string,
  ): Promise<WorkoutTemplate> {
    const { exercises, ...rest } = data;

    const result = await this.prismaService.workoutTemplate.create({
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
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    return PrismaWorkoutTemplateMapper.toWorkoutTemplate(result);
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
          user: {
            select: {
              id: true,
            },
          },
        },
      });

      return PrismaWorkoutTemplateMapper.toWorkoutTemplate(result);
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
          user: {
            select: {
              id: true,
            },
          },
        },
      });

    const updateResult = await this.prismaService.$transaction([
      deleteExistingExercisesPromise,
      updateWorkoutTemplateWithNewDataPromise,
    ]);

    return PrismaWorkoutTemplateMapper.toWorkoutTemplate(updateResult[1]);
  }

  async delete(id: string): Promise<WorkoutTemplate> {
    const deletedWorkoutTemplate =
      await this.prismaService.workoutTemplate.delete({
        where: { id },
        include: {
          exercises: {
            include: {
              exercise: true,
            },
          },
          user: {
            select: {
              id: true,
            },
          },
        },
      });

    return PrismaWorkoutTemplateMapper.toWorkoutTemplate(
      deletedWorkoutTemplate,
    );
  }
}
