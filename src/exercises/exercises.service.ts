import { Injectable } from '@nestjs/common';
import { CreateExerciseDTO } from './dtos/create-exercise-dto';
import { UpdateExerciseByIdDTO } from './dtos/update-exercise-by-id-dto';
import { PaginationDTO } from 'src/common/pagination-dto';
import { ExerciseRepository } from './respositories/exercise.repository';

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 15;

@Injectable()
export class ExercisesService {
  constructor(private exerciseRepository: ExerciseRepository) {}

  async getAll(paginationDto: PaginationDTO) {
    const { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT } = paginationDto;

    const skip = (page - 1) * limit;

    const getTotalCountPromise = this.exerciseRepository.count();
    const getDataPromise = this.exerciseRepository.findMany({
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
