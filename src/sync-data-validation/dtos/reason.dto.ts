import { IsNotEmpty, IsString } from 'class-validator';

export class ReasonDTO {
  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsString()
  @IsNotEmpty()
  details: string;

  @IsString()
  @IsNotEmpty()
  vigilancePoint: string;
}
