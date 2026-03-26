import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsString, Max } from 'class-validator';

export class CursorPaginationDTO {
  @IsOptional()
  @IsString()
  @Type(() => String)
  cursor?: string;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Max(50)
  @Type(() => Number)
  limit: number = 15;
}
