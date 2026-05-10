export type ExerciseCategory =
  | 'NECK'
  | 'SHOULDERS'
  | 'ARMS'
  | 'BACK'
  | 'CHEST'
  | 'CORE'
  | 'LEGS';

export interface Exercise {
  id: string;
  name: string;
  description: string | null;
  category: ExerciseCategory;
  createdAt: Date;
  updatedAt: Date;
}
