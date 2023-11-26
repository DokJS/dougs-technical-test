import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class BalanceDTO {
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  balance: number;
}
