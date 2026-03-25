export type ExerciseCategory =
  | 'NECK'
  | 'SHOULDERS'
  | 'ARMS'
  | 'BACK'
  | 'CHEST'
  | 'CORE'
  | 'LEGS';

export class ExerciseDTO {
  id: string;
  name: string;
  description: string | null;
  category: ExerciseCategory;
  createdAt: Date;
  updatedAt: Date;
}
