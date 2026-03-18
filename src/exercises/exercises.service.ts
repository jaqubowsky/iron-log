import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExerciseDTO } from './dtos/create-exercise-dto';
import { Exercise, ExerciseId } from './types/exercise';
import { randomUUID } from 'crypto';
import { UpdateExerciseByIdDTO } from './dtos/update-exercise-by-id-dto';

type Result<T> = { ok: true; data: T } | { ok: false };

type ExerciseAtIndex = {
  exercise: Exercise;
  index: number;
};

@Injectable()
export class ExercisesService {
  private exercises: Exercise[] = [];

  private getExerciseAtIndex(id: ExerciseId): Result<ExerciseAtIndex> {
    const foundExercise = this.getById(id);
    if (!foundExercise) return { ok: false };

    const exerciseIndex = this.exercises.indexOf(foundExercise);
    if (exerciseIndex === -1) return { ok: false };

    return {
      ok: true,
      data: { exercise: foundExercise, index: exerciseIndex },
    };
  }

  getAll(): Exercise[] {
    return this.exercises;
  }

  createExercise(createExerciseDTO: CreateExerciseDTO) {
    const exercise = { ...createExerciseDTO, id: randomUUID() as ExerciseId };

    this.exercises.push(exercise);
    return exercise;
  }

  getById(id: ExerciseId) {
    return this.exercises.find(
      (exercise) => String(exercise.id) === String(id),
    );
  }

  updateExercise(id: ExerciseId, updateExerciseByIdDTO: UpdateExerciseByIdDTO) {
    const result = this.getExerciseAtIndex(id);
    if (!result.ok) throw new NotFoundException('Exercise not found');

    const {
      data: { exercise, index },
    } = result;

    const updatedExercise = (this.exercises[index] = {
      ...exercise,
      ...updateExerciseByIdDTO,
    });

    return updatedExercise;
  }

  removeExercise(id: ExerciseId) {
    const result = this.getExerciseAtIndex(id);
    if (!result.ok) throw new NotFoundException('Exercise not found');

    const {
      data: { exercise, index },
    } = result;

    this.exercises.splice(index, 1);

    return exercise;
  }
}
