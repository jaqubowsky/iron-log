export type ExerciseCategory =
  | 'neck'
  | 'shoulders'
  | 'arms'
  | 'back'
  | 'chest'
  | 'legs';

export type ExerciseId = string & { readonly __brand: unique symbol };

export interface Exercise {
  id: ExerciseId;
  name: string;
  category: ExerciseCategory;
  description: string;
}
