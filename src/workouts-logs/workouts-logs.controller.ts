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
import { WorkoutsLogsService } from './workouts-logs.service';
import { CreateWorkoutLogDTO } from './dtos/create-workout-log-dto';
import { UpdateWorkoutLogDTO } from './dtos/update-workout-log-dto';
import { CursorPaginationDTO } from 'src/common/cursor-pagination/cursor-pagination-dto';
import {
  WorkoutLogResponseDTO,
  WorkoutLogSimpleResponseDTO,
} from './dtos/workout-log-response-dto';

@Controller('workout-logs')
export class WorkoutsLogsController {
  constructor(private workoutsLogsService: WorkoutsLogsService) {}

  @Get()
  async findAll(@Query() cursorPaginationDto: CursorPaginationDTO) {
    const { cursor, limit } = cursorPaginationDto;
    const response = await this.workoutsLogsService.findMany({ cursor, limit });

    const workoutLogResponse = response.data.map((result) =>
      WorkoutLogSimpleResponseDTO.from(result),
    );

    return {
      data: workoutLogResponse,
      meta: response.meta,
    };
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = await this.workoutsLogsService.getById(id);
    return WorkoutLogResponseDTO.from(response);
  }

  @Post()
  async create(@Body() data: CreateWorkoutLogDTO) {
    const response = await this.workoutsLogsService.create(data);
    return WorkoutLogResponseDTO.from(response);
  }

  @Patch(':id')
  async updateOne(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() data: UpdateWorkoutLogDTO,
  ) {
    const response = await this.workoutsLogsService.update(id, data);
    return WorkoutLogResponseDTO.from(response);
  }

  @Delete(':id')
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    const response = await this.workoutsLogsService.delete(id);
    return WorkoutLogResponseDTO.from(response);
  }
}
