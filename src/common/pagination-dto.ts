import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  limit?: number;
}
