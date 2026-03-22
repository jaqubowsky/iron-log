import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { UpdateWorkoutTemplateDTO } from './dtos/update-workout-template-dto';
import { CreateWorkoutTemplateDTO } from './dtos/create-workout-template-dto';

@Controller('workout-templates')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @Get()
  findAll() {
    return this.workoutsService.getAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.workoutsService.getById(id);
  }

  @Delete(':id')
  removeOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.workoutsService.deleteWorkoutTemplate(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateWorkoutTemplateDTO,
  ) {
    return this.workoutsService.updateWorkoutTemplate(id, data);
  }

  @Post()
  create(@Body() data: CreateWorkoutTemplateDTO) {
    return this.workoutsService.createWorkoutTemplate(data);
  }
}
