import { PartialType } from '@nestjs/mapped-types';
import { CreateExerciseDTO } from './create-exercise-dto';

export class UpdateExerciseByIdDTO extends PartialType(CreateExerciseDTO) {}
