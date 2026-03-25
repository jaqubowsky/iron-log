import { CreateExerciseDTO } from '../dtos/create-exercise-dto';
import { UpdateExerciseByIdDTO } from '../dtos/update-exercise-by-id-dto';
import { ExerciseRepository } from './exercise.repository';
import { PrismaService } from 'src/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { ExerciseDTO } from '../dtos/exercise-dto';

@Injectable()
export class PrismaExerciseRepository implements ExerciseRepository {
  constructor(private prismaService: PrismaService) {}

  findMany({
    skip,
    take,
  }: {
    skip?: number;
    take?: number;
  }): Promise<ExerciseDTO[]> {
    return this.prismaService.exercise.findMany({
      skip,
      take,
    });
  }

  findUnique(id: string): Promise<ExerciseDTO> {
    return this.prismaService.exercise.findUniqueOrThrow({ where: { id } });
  }

  count(): Promise<number> {
    return this.prismaService.exercise.count();
  }

  create(data: CreateExerciseDTO): Promise<ExerciseDTO> {
    return this.prismaService.exercise.create({ data });
  }

  update({
    id,
    data,
  }: {
    id: string;
    data: UpdateExerciseByIdDTO;
  }): Promise<ExerciseDTO> {
    return this.prismaService.exercise.update({ where: { id }, data });
  }

  delete(id: string): Promise<ExerciseDTO> {
    return this.prismaService.exercise.delete({ where: { id } });
  }
}
