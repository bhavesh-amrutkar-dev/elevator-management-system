import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  Max,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTierDto {
  @IsString({ message: 'Tier name must be text' })
  @IsNotEmpty({ message: 'Tier name is required' })
  name!: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'Discount must be a number' })
  @Min(0, { message: 'Discount cannot be negative' })
  @Max(100, { message: 'Discount cannot exceed 100%' })
  discountPct!: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Credit rate must be a number' })
  @Min(0, { message: 'Credit rate must be at least 0' })
  creditRate!: number;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean({ message: 'isActive must be true or false' })
  isActive?: boolean;
}