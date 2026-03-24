import { Injectable } from '@nestjs/common';
import { CreateExerciseDTO } from './dtos/create-exercise-dto';
import { UpdateExerciseByIdDTO } from './dtos/update-exercise-by-id-dto';
import { PrismaService } from 'src/db/prisma.service';
import { PaginationDTO } from 'src/common/pagination-dto';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 15;

@Injectable()
export class ExercisesService {
  constructor(private prisma: PrismaService) {}

  async getAll(paginationDto: PaginationDTO) {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = paginationDto;

    const skip = (page - 1) * limit;

    const getTotalCountPromise = this.prisma.exercise.count();
    const getDataPromise = this.prisma.exercise.findMany({
      skip,
      take: limit,
    });

    const [totalCount, data] = await Promise.all([
      getTotalCountPromise,
      getDataPromise,
    ]);

    const hasMoreItems = totalCount > page * limit;

    return {
      data,
      meta: {
        totalCount,
        hasMoreItems,
        page,
        limit,
      },
    };
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
      data: updateExerciseByIdDTO,
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
