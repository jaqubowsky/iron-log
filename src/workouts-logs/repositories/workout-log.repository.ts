import { CreateWorkoutLogPayload } from '../interfaces/create-workout-log-payload';
import { UpdateWorkoutLogPayload } from '../interfaces/update-workout-log-payload';
import { WorkoutLog, WorkoutLogSimple } from '../interfaces/workout-log';

export abstract class WorkoutLogRepository {
  abstract findMany(params: {
    cursor?: string;
    take: number;
  }): Promise<WorkoutLogSimple[]>;

  abstract findUnique(id: string): Promise<WorkoutLog>;

  abstract create(
    data: CreateWorkoutLogPayload,
    userId: string,
  ): Promise<WorkoutLog>;

  abstract update(params: {
    id: string;
    data: UpdateWorkoutLogPayload;
  }): Promise<WorkoutLog>;

  abstract delete(id: string): Promise<WorkoutLog>;
}
