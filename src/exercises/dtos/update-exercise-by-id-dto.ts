import { ExerciseCategory } from '../types/exercise';

export class UpdateExerciseByIdDTO {
  name?: string;
  description?: string;
  category?: ExerciseCategory;
}
