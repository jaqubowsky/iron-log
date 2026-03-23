import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { CreateWorkoutTemplateDTO } from './dtos/create-workout-template-dto';
import { UpdateWorkoutTemplateDTO } from './dtos/update-workout-template-dto';
import { WorkoutExerciseDTO } from './dtos/workout-exercise-dto';

@Injectable()
export class WorkoutsService {
  constructor(private prisma: PrismaService) {}

  private async getNonExistingExerciseIds(
    workoutExercises: WorkoutExerciseDTO[],
  ) {
    const ids = workoutExercises.map((exercise) => exercise.exerciseId);

    const exercises = await this.prisma.exercise.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const nonExistingIds = ids.filter(
      (id) => !exercises.find((exercise) => exercise.id === id),
    );

    return nonExistingIds;
  }

  async getAll() {
    return await this.prisma.workoutTemplate.findMany({
      include: {
        exercises: {
          include: { exercise: true },
        },
      },
    });
  }

  async getById(id: string) {
    const workoutTemplate = await this.prisma.workoutTemplate.findUniqueOrThrow(
      {
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
      },
    );

    return workoutTemplate;
  }

  async createWorkoutTemplate(
    createWorkoutTemplateDTO: CreateWorkoutTemplateDTO,
  ) {
    const ids = await this.getNonExistingExerciseIds(
      createWorkoutTemplateDTO.exercises,
    );
    if (ids.length > 0) {
      throw new BadRequestException(
        `Exercises with ids: [${ids.join(', ')}] not found.`,
      );
    }

    const { exercises, ...rest } = createWorkoutTemplateDTO;

    const workoutTemplate = await this.prisma.workoutTemplate.create({
      data: {
        ...rest,
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

    return workoutTemplate;
  }

  async updateWorkoutTemplate(
    id: string,
    updateWorkoutTemplateDTO: UpdateWorkoutTemplateDTO,
  ) {
    const { exercises, ...rest } = updateWorkoutTemplateDTO;

    if (!updateWorkoutTemplateDTO.exercises) {
      const result = await this.prisma.workoutTemplate.update({
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

    const ids = await this.getNonExistingExerciseIds(
      updateWorkoutTemplateDTO.exercises,
    );

    if (ids.length > 0) {
      throw new BadRequestException(
        `Exercises with ids: [${ids.join(', ')}] not found.`,
      );
    }

    const deleteExistingExercisesPromise = this.prisma.workoutTemplate.update({
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
      this.prisma.workoutTemplate.update({
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

    const updateResult = await this.prisma.$transaction([
      deleteExistingExercisesPromise,
      updateWorkoutTemplateWithNewDataPromise,
    ]);

    return updateResult[1];
  }

  async deleteWorkoutTemplate(id: string) {
    const result = await this.prisma.workoutTemplate.delete({
      where: {
        id,
      },
    });

    return result;
  }
}
