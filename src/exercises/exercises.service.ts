import { Injectable } from '@nestjs/common';
import { CreateExerciseDTO } from './dtos/create-exercise-dto';
import { UpdateExerciseByIdDTO } from './dtos/update-exercise-by-id-dto';
import { OffsetPaginationDTO } from 'src/common/offset-pagination/offset-pagination-dto';
import { ExerciseRepository } from './repositories/exercise.repository';
import { getOffsetPagination } from 'src/common/offset-pagination/lib';
import { ExerciseDTO } from './dtos/exercise-dto';

@Injectable()
export class ExercisesService {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async getAll(pagination: OffsetPaginationDTO) {
    const { skip, limit } = pagination;

    const { items, total } = await this.exerciseRepository.findMany({
      skip,
      limit,
    });

    return getOffsetPagination({
      items,
      total,
      page: pagination.page,
      limit: pagination.limit,
    });
  }

  async findManyByIds(ids: string[]): Promise<ExerciseDTO[]> {
    return await this.exerciseRepository.findManyByIds(ids);
  }

  async resolveExerciseIds(
    ids: string[],
  ): Promise<{ exercises: ExerciseDTO[]; nonExistingIds: string[] }> {
    return this.exerciseRepository.resolveExerciseIds(ids);
  }

  async createExercise(createExerciseDTO: CreateExerciseDTO) {
    const exercise = await this.exerciseRepository.create(createExerciseDTO);

    return exercise;
  }

  async getById(id: string) {
    const exercise = await this.exerciseRepository.findUnique(id);
    return exercise;
  }

  async updateExercise(
    id: string,
    updateExerciseByIdDTO: UpdateExerciseByIdDTO,
  ) {
    const updatedExercise = await this.exerciseRepository.update({
      id,
      data: updateExerciseByIdDTO,
    });

    return updatedExercise;
  }

  async removeExercise(id: string) {
    return await this.exerciseRepository.delete(id);
  }
}
