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
import { WorkoutTemplateResponseDTO } from './dtos/workout-template-response-dto';

@Controller('workout-templates')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @Get()
  async findAll() {
    const response = await this.workoutsService.getAll();
    return response.map((result) => new WorkoutTemplateResponseDTO(result));
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = await this.workoutsService.getById(id);
    return new WorkoutTemplateResponseDTO(response);
  }

  @Delete(':id')
  async removeOne(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.workoutsService.deleteWorkoutTemplate(id);
    return { message: 'Workout template successfully deleted.' };
  }

  @Patch(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateWorkoutTemplateDTO,
  ) {
    const response = await this.workoutsService.updateWorkoutTemplate(id, data);
    return new WorkoutTemplateResponseDTO(response);
  }

  @Post()
  async create(@Body() data: CreateWorkoutTemplateDTO) {
    const response = await this.workoutsService.createWorkoutTemplate(data);
    return new WorkoutTemplateResponseDTO(response);
  }
}
