import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateWorkoutTemplateDTO } from './dtos/create-workout-template-dto';
import { UpdateWorkoutTemplateDTO } from './dtos/update-workout-template-dto';
import { CursorPaginationDTO } from 'src/common/cursor-pagination/cursor-pagination-dto';
import { WorkoutRepository } from './repositories/workout.repository';
import { getCursorPagination } from 'src/common/cursor-pagination/lib';

@Injectable()
export class WorkoutsService {
  constructor(private workoutRepository: WorkoutRepository) {}

  async getAll(pagination: CursorPaginationDTO) {
    const { cursor, limit } = pagination;

    // we need to take 1 more item to avoid duplicating item vs cursor in reponse
    const take = limit + 1;

    const data = await this.workoutRepository.findMany({ cursor, take });
    return getCursorPagination({ items: data, limit: pagination.limit });
  }

  async getById(id: string) {
    const workoutTemplate = await this.workoutRepository.findUnique(id);
    return workoutTemplate;
  }

  async createWorkoutTemplate(
    createWorkoutTemplateDTO: CreateWorkoutTemplateDTO,
  ) {
    const ids = await this.workoutRepository.findNonExistingExerciseIds(
      createWorkoutTemplateDTO.exercises,
    );

    if (ids.length > 0) {
      throw new BadRequestException(
        `Exercises with ids: [${ids.join(', ')}] not found.`,
      );
    }

    const workoutTemplate = await this.workoutRepository.create(
      createWorkoutTemplateDTO,
    );

    return workoutTemplate;
  }

  async updateWorkoutTemplate(
    id: string,
    updateWorkoutTemplateDTO: UpdateWorkoutTemplateDTO,
  ) {
    if (updateWorkoutTemplateDTO.exercises) {
      const ids = await this.workoutRepository.findNonExistingExerciseIds(
        updateWorkoutTemplateDTO.exercises,
      );

      if (ids.length > 0) {
        throw new BadRequestException(
          `Exercises with ids: [${ids.join(', ')}] not found.`,
        );
      }
    }

    const result = await this.workoutRepository.update({
      id,
      data: updateWorkoutTemplateDTO,
    });

    return result;
  }

  async deleteWorkoutTemplate(id: string) {
    const result = await this.workoutRepository.delete(id);
    return result;
  }
}
