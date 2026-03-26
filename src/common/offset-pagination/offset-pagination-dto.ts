import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, Max } from 'class-validator';

export class OffsetPaginationDTO {
  @IsOptional()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  page: number = 1;

  @IsOptional()
  @IsPositive()
  @IsInt()
  @Max(50)
  @Type(() => Number)
  limit: number = 15;

  get skip() {
    return (this.page - 1) * this.limit;
  }
}
