import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ReasonDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  summary: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  details: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  vigilancePoint: string;
}
