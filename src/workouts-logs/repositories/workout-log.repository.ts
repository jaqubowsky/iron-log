import { CreateWorkoutLogPayload } from '../interfaces/create-workout-log-payload';
import { UpdateWorkoutLogPayload } from '../interfaces/update-workout-log-payload';
import { WorkoutLog } from '../interfaces/workout-log';

export abstract class WorkoutLogRepository {
  abstract findMany(params: {
    cursor?: string;
    take: number;
  }): Promise<WorkoutLog[]>;

  abstract findUnique(id: string): Promise<WorkoutLog>;

  abstract create(data: CreateWorkoutLogPayload): Promise<WorkoutLog>;

  abstract update(params: {
    id: string;
    data: UpdateWorkoutLogPayload;
  }): Promise<WorkoutLog>;

  abstract delete(id: string): Promise<WorkoutLog>;
}
