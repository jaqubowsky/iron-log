import { CreateExerciseDTO } from '../dtos/create-exercise-dto';
import { UpdateExerciseByIdDTO } from '../dtos/update-exercise-by-id-dto';
import { ExerciseDTO } from '../dtos/exercise-dto';

export abstract class ExerciseRepository {
  abstract findMany({
    skip,
    take,
  }: {
    skip?: number;
    take?: number;
  }): Promise<ExerciseDTO[]>;

  abstract findUnique(id: string): Promise<ExerciseDTO>;

  abstract count(): Promise<number>;

  abstract create(data: CreateExerciseDTO): Promise<ExerciseDTO>;

  abstract update({
    id,
    data,
  }: {
    id: string;
    data: UpdateExerciseByIdDTO;
  }): Promise<ExerciseDTO>;

  abstract delete(id: string): Promise<ExerciseDTO>;
}
