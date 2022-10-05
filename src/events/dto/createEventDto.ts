import { IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(1)
  @Max(31)
  day: number;

  @Min(1)
  @Max(12)
  month: number;
}
