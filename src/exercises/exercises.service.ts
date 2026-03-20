import { Injectable } from '@nestjs/common';
import { CreateExerciseDTO } from './dtos/create-exercise-dto';
import { UpdateExerciseByIdDTO } from './dtos/update-exercise-by-id-dto';
import { PrismaService } from 'src/db/prisma.service';
import { Exercise } from 'prisma/generated/prisma/client';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Exercise[]> {
    return await this.prisma.exercise.findMany();
  }

  async createExercise(createExerciseDTO: CreateExerciseDTO) {
    const exercise = await this.prisma.exercise.create({
      data: createExerciseDTO,
    });

    return exercise;
  }

  async getById(id: string) {
    const exercise = await this.prisma.exercise.findUniqueOrThrow({
      where: {
        id,
      },
    });
    return exercise;
  }

  async updateExercise(
    id: string,
    updateExerciseByIdDTO: UpdateExerciseByIdDTO,
  ) {
    const updatedExercise = await this.prisma.exercise.update({
      where: {
        id,
      },
      data: { ...updateExerciseByIdDTO },
    });

    return updatedExercise;
  }

  async removeExercise(id: string) {
    const removedExercise = await this.prisma.exercise.delete({
      where: { id },
    });

    return removedExercise;
  }
}
