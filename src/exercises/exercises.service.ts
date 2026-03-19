import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDTO } from './dtos/create-exercise-dto';
import { UpdateExerciseByIdDTO } from './dtos/update-exercise-by-id-dto';
import { PrismaService } from 'src/db/prisma.service';
import { Exercise } from 'generated/prisma/client';

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  private async exerciseById(id: string) {
    const exercise = await this.prisma.exercise.findUnique({
      where: {
        id,
      },
    });
    if (!exercise) return null;

    return exercise;
  }

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
    const exercise = await this.exerciseById(id);
    if (!exercise) throw new NotFoundException('Exercise not found');

    return exercise;
  }

  async updateExercise(
    id: string,
    updateExerciseByIdDTO: UpdateExerciseByIdDTO,
  ) {
    const exercise = await this.exerciseById(id);
    if (!exercise) throw new NotFoundException('Exercise not found');

    const updatedExercise = await this.prisma.exercise.update({
      where: {
        id,
      },
      data: { ...updateExerciseByIdDTO },
    });

    return updatedExercise;
  }

  async removeExercise(id: string) {
    const exercise = await this.exerciseById(id);
    if (!exercise) throw new NotFoundException('Exercise not found');

    const removedExercise = await this.prisma.exercise.delete({
      where: { id },
    });

    return removedExercise;
  }
}
