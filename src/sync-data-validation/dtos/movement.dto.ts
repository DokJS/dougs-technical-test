import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class MovementDTO {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsString()
  @IsNotEmpty()
  label: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}
