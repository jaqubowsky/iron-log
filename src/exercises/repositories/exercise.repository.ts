import { CreateExerciseDTO } from '../dtos/create-exercise-dto';
import { UpdateExerciseByIdDTO } from '../dtos/update-exercise-by-id-dto';
import { Exercise } from '../interfaces/exercise';

export abstract class ExerciseRepository {
  abstract findMany({
    skip,
    limit,
  }: {
    skip?: number;
    limit?: number;
  }): Promise<{ items: Exercise[]; total: number }>;

  abstract findManyByIds(ids: string[]): Promise<Exercise[]>;

  abstract findUnique(id: string): Promise<Exercise>;

  abstract create(data: CreateExerciseDTO): Promise<Exercise>;

  abstract resolveExerciseIds(
    ids: string[],
  ): Promise<{ exercises: Exercise[]; nonExistingIds: string[] }>;

  abstract update({
    id,
    data,
  }: {
    id: string;
    data: UpdateExerciseByIdDTO;
  }): Promise<Exercise>;

  abstract delete(id: string): Promise<Exercise>;
}
