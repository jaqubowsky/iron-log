import { CreateWorkoutTemplateDTO } from '../dtos/create-workout-template-dto';
import { UpdateWorkoutTemplateDTO } from '../dtos/update-workout-template-dto';
import { WorkoutTemplateDTO } from '../dtos/workout-template-dto';

export abstract class WorkoutRepository {
  abstract findMany({
    cursor,
    take,
  }: {
    cursor?: string;
    take: number;
  }): Promise<WorkoutTemplateDTO[]>;

  abstract findUnique(id: string): Promise<WorkoutTemplateDTO>;

  abstract create(data: CreateWorkoutTemplateDTO): Promise<WorkoutTemplateDTO>;

  abstract update({
    id,
    data,
  }: {
    id: string;
    data: UpdateWorkoutTemplateDTO;
  }): Promise<WorkoutTemplateDTO>;

  abstract delete(id: string): Promise<WorkoutTemplateDTO>;
}
