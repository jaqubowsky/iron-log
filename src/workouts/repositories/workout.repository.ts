import { CreateWorkoutTemplateDTO } from '../dtos/create-workout-template-dto';
import { UpdateWorkoutTemplateDTO } from '../dtos/update-workout-template-dto';
import { WorkoutTemplate } from '../interfaces/workout-template';

export abstract class WorkoutRepository {
  abstract findMany({
    cursor,
    take,
  }: {
    cursor?: string;
    take: number;
  }): Promise<WorkoutTemplate[]>;

  abstract findUnique(id: string): Promise<WorkoutTemplate>;

  abstract create(
    data: CreateWorkoutTemplateDTO,
    userId: string,
  ): Promise<WorkoutTemplate>;

  abstract update({
    id,
    data,
  }: {
    id: string;
    data: UpdateWorkoutTemplateDTO;
  }): Promise<WorkoutTemplate>;

  abstract delete(id: string): Promise<WorkoutTemplate>;
}
