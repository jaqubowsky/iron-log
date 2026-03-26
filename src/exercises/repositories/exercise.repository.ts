import { CreateExerciseDTO } from '../dtos/create-exercise-dto';
import { UpdateExerciseByIdDTO } from '../dtos/update-exercise-by-id-dto';
import { ExerciseDTO } from '../dtos/exercise-dto';

export abstract class ExerciseRepository {
  abstract findMany({
    skip,
    limit,
  }: {
    skip?: number;
    limit?: number;
  }): Promise<{ items: ExerciseDTO[]; total: number }>;

  abstract findManyByIds(ids: string[]): Promise<ExerciseDTO[]>;

  abstract findUnique(id: string): Promise<ExerciseDTO>;

  abstract create(data: CreateExerciseDTO): Promise<ExerciseDTO>;

  abstract resolveExerciseIds(
    ids: string[],
  ): Promise<{ exercises: ExerciseDTO[]; nonExistingIds: string[] }>;

  abstract update({
    id,
    data,
  }: {
    id: string;
    data: UpdateExerciseByIdDTO;
  }): Promise<ExerciseDTO>;

  abstract delete(id: string): Promise<ExerciseDTO>;
}
