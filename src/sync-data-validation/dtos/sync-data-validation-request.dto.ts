import { IsArray, IsNotEmpty } from 'class-validator';
import { BalanceDTO } from './balance.dto';
import { MovementDTO } from './movement.dto';
import { ApiProperty } from '@nestjs/swagger';

export class SyncDataValidationRequestDTO {
  @ApiProperty({ type: () => [MovementDTO] })
  @IsArray()
  @IsNotEmpty()
  movements: MovementDTO[];

  @ApiProperty({ type: () => [BalanceDTO] })
  @IsArray()
  @IsNotEmpty()
  balances: BalanceDTO[];
}
