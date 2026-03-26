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
import { WorkoutsService } from './workouts.service';
import { UpdateWorkoutTemplateDTO } from './dtos/update-workout-template-dto';
import { CreateWorkoutTemplateDTO } from './dtos/create-workout-template-dto';
import { WorkoutTemplateResponseDTO } from './dtos/workout-template-response-dto';
import { CursorPaginationDTO } from 'src/common/cursor-pagination/cursor-pagination-dto';

@Controller('workout-templates')
export class WorkoutsController {
  constructor(private workoutsService: WorkoutsService) {}

  @Get()
  async findAll(@Query() cursorPaginationDto: CursorPaginationDTO) {
    const { cursor, limit } = cursorPaginationDto;
    const response = await this.workoutsService.getAll({ cursor, limit });

    const workoutResponse = response.data.map((result) =>
      WorkoutTemplateResponseDTO.from(result),
    );

    return {
      data: workoutResponse,
      meta: response.meta,
    };
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = await this.workoutsService.getById(id);
    return WorkoutTemplateResponseDTO.from(response);
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
    return WorkoutTemplateResponseDTO.from(response);
  }

  @Post()
  async create(@Body() data: CreateWorkoutTemplateDTO) {
    const response = await this.workoutsService.createWorkoutTemplate(data);
    return WorkoutTemplateResponseDTO.from(response);
  }
}
