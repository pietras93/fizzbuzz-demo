import { IsInt, IsNumber, Min } from 'class-validator';

export class GetFizzBuzzDto {
  @IsNumber()
  @Min(1)
  @IsInt()
  count: number;
}
