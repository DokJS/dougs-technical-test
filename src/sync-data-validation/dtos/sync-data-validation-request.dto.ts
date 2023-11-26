import { IsArray, IsNotEmpty } from 'class-validator';
import { BalanceDTO } from './balance.dto';
import { MovementDTO } from './movement.dto';

export class SyncDataValidationRequestDTO {
  @IsArray()
  @IsNotEmpty()
  movements: MovementDTO[];

  @IsArray()
  @IsNotEmpty()
  balances: BalanceDTO[];
}
