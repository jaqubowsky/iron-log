import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';

export class PaginationDTO {
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Max(50)
  @Type(() => Number)
  limit?: number;
}
