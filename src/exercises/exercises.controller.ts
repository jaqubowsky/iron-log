import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { type ExerciseId } from './types/exercise';
import { type UpdateExerciseByIdDTO } from './dtos/update-exercise-by-id-dto';
import { CreateExerciseDTO } from './dtos/create-exercise-dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Get()
  findAll() {
    return this.exercisesService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: ExerciseId) {
    return this.exercisesService.getById(id);
  }

  @Delete(':id')
  removeOne(@Param('id') id: ExerciseId) {
    return this.exercisesService.removeExercise(id);
  }

  @Patch(':id')
  updateOne(@Param('id') id: ExerciseId, @Body() data: UpdateExerciseByIdDTO) {
    return this.exercisesService.updateExercise(id, data);
  }

  @Post()
  create(@Body() data: CreateExerciseDTO) {
    return this.exercisesService.createExercise(data);
  }
}
