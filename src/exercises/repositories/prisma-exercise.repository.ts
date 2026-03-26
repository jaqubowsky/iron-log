import { CreateExerciseDTO } from '../dtos/create-exercise-dto';
import { UpdateExerciseByIdDTO } from '../dtos/update-exercise-by-id-dto';
import { ExerciseRepository } from './exercise.repository';
import { PrismaService } from 'src/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { ExerciseDTO } from '../dtos/exercise-dto';

@Injectable()
export class PrismaExerciseRepository implements ExerciseRepository {
  constructor(private prismaService: PrismaService) {}

  async findMany({
    skip,
    limit,
  }: {
    skip?: number;
    limit?: number;
  }): Promise<{ items: ExerciseDTO[]; total: number }> {
    const [items, total] = await Promise.all([
      this.prismaService.exercise.findMany({
        skip,
        take: limit,
      }),
      this.prismaService.exercise.count(),
    ]);

    return { items, total };
  }

  async findManyByIds(ids: string[]): Promise<ExerciseDTO[]> {
    return await this.prismaService.exercise.findMany({
      where: { id: { in: ids } },
    });
  }

  async resolveExerciseIds(
    ids: string[],
  ): Promise<{ exercises: ExerciseDTO[]; nonExistingIds: string[] }> {
    const exercises = await this.prismaService.exercise.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const nonExistingIds = ids.filter(
      (id) => !exercises.find((exercise) => exercise.id === id),
    );

    return { exercises, nonExistingIds };
  }

  findUnique(id: string): Promise<ExerciseDTO> {
    return this.prismaService.exercise.findUniqueOrThrow({ where: { id } });
  }

  create(data: CreateExerciseDTO): Promise<ExerciseDTO> {
    return this.prismaService.exercise.create({ data });
  }

  update({
    id,
    data,
  }: {
    id: string;
    data: UpdateExerciseByIdDTO;
  }): Promise<ExerciseDTO> {
    return this.prismaService.exercise.update({ where: { id }, data });
  }

  delete(id: string): Promise<ExerciseDTO> {
    return this.prismaService.exercise.delete({ where: { id } });
  }
}
