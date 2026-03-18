import { ExerciseCategory } from '../types/exercise';

export class CreateExerciseDTO {
  name: string;
  description: string;
  category: ExerciseCategory;
}
