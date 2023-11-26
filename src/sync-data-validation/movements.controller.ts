import { Body, Controller, Post, Res } from '@nestjs/common';
import { SyncDataValidationRequestDTO } from './dtos/sync-data-validation-request.dto';
import { MovementsService } from './movements.service';
import { Response } from 'express';

@Controller('movements')
export class MovementsController {
  constructor(private readonly movementsService: MovementsService) {}

  @Post('validation')
  async syncDataValidation(
    @Res() response: Response,
    @Body() syncDataValidationRequest: SyncDataValidationRequestDTO,
  ) {
    return this.movementsService.validateSyncData(syncDataValidationRequest, response);
  }
}
