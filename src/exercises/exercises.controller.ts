import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { UpdateExerciseByIdDTO } from './dtos/update-exercise-by-id-dto';
import { CreateExerciseDTO } from './dtos/create-exercise-dto';
import { OffsetPaginationDTO } from 'src/common/offset-pagination/offset-pagination-dto';

@Controller('exercises')
export class ExercisesController {
  constructor(private exercisesService: ExercisesService) {}

  @Get()
  findAll(@Query() paginationDto: OffsetPaginationDTO) {
    const { limit, page, skip } = paginationDto;
    return this.exercisesService.getAll({ skip, limit, page });
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.exercisesService.getById(id);
  }

  @Delete(':id')
  removeOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.exercisesService.removeExercise(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateExerciseByIdDTO,
  ) {
    return this.exercisesService.updateExercise(id, data);
  }

  @Post()
  create(@Body() data: CreateExerciseDTO) {
    return this.exercisesService.createExercise(data);
  }
}
