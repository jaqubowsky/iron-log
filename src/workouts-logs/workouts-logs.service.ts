import { BadRequestException, Injectable } from '@nestjs/common';
import { WorkoutLogRepository } from './repositories/workout-log.repository';
import { CursorPaginationDTO } from 'src/common/cursor-pagination/cursor-pagination-dto';
import { getCursorPagination } from 'src/common/cursor-pagination/lib';
import { CreateWorkoutLogDTO } from './dtos/create-workout-log-dto';
import { WorkoutLogMapper } from './workout-log.mapper';
import { UpdateWorkoutLogDTO } from './dtos/update-workout-log-dto';
import { ExercisesService } from 'src/exercises/exercises.service';
import { WorkoutsService } from 'src/workouts/workouts.service';

@Injectable()
export class WorkoutsLogsService {
  constructor(
    private workoutLogRepository: WorkoutLogRepository,
    private workoutTemplateService: WorkoutsService,
    private exerciseService: ExercisesService,
  ) {}

  async findMany(pagination: CursorPaginationDTO) {
    const { cursor, limit } = pagination;

    // we need to take 1 more item to avoid duplicating item vs cursor in reponse
    const take = limit + 1;

    const data = await this.workoutLogRepository.findMany({ cursor, take });
    return getCursorPagination({ items: data, limit: pagination.limit });
  }

  async getById(id: string) {
    const data = await this.workoutLogRepository.findUnique(id);
    return data;
  }

  async create(data: CreateWorkoutLogDTO) {
    const exerciseIds = data.exercises.map((exercise) => exercise.exerciseId);
    const { exercises, nonExistingIds } =
      await this.exerciseService.resolveExerciseIds(exerciseIds);

    if (nonExistingIds.length > 0) {
      throw new BadRequestException(
        `Exercises with ids: [${nonExistingIds.join(', ')}] not found.`,
      );
    }

    if (data.workoutTemplateId) {
      const { name, description, id } =
        await this.workoutTemplateService.getById(data.workoutTemplateId);

      const payload = WorkoutLogMapper.toCreatePayload(data, exercises, {
        name,
        description,
        workoutTemplateId: id,
      });

      const workoutLog = await this.workoutLogRepository.create(payload);
      return workoutLog;
    }

    const payload = WorkoutLogMapper.toCreatePayload(data, exercises, {
      name: data.name!,
      description: data.description ?? null,
    });

    const workoutLog = await this.workoutLogRepository.create(payload);
    return workoutLog;
  }

  async update(id: string, data: UpdateWorkoutLogDTO) {
    const exerciseIds = data.exercises.map((exercise) => exercise.exerciseId);
    const { exercises, nonExistingIds } =
      await this.exerciseService.resolveExerciseIds(exerciseIds);

    if (nonExistingIds.length > 0) {
      throw new BadRequestException(
        `Exercises with ids: [${nonExistingIds.join(', ')}] not found.`,
      );
    }

    const payload = WorkoutLogMapper.toUpdatePayload(data, exercises);
    return this.workoutLogRepository.update({ id, data: payload });
  }

  async delete(id: string) {
    return this.workoutLogRepository.delete(id);
  }
}
