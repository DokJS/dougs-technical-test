import { HttpStatus, Injectable } from '@nestjs/common';
import { SyncDataValidationRequestDTO } from './dtos/sync-data-validation-request.dto';
import { MovementDTO } from './dtos/movement.dto';
import { BalanceDTO } from './dtos/balance.dto';
import {
  AbstractResponse,
  FailedSyncDataValidationResponse,
  SuccededSyncDataValidationResponse,
} from '../common/custom-response';
import { ReasonDTO } from './dtos/reason.dto';
import { Response } from 'express';

@Injectable()
export class MovementsService {
  async validateSyncData(
    syncDataValidationRequest: SyncDataValidationRequestDTO,
    httpResponse: Response,
  ) {
    const results: AbstractResponse[] = [];

    syncDataValidationRequest.balances.forEach((balance) => {
      const movementsPeriod = this.getMovementsByPeriod(
        balance.date,
        syncDataValidationRequest.movements,
      );
      const movementsBalancePeriod =
        this.getTotalMovementsAmount(movementsPeriod);
      const result = this.checkDataIntegrity(movementsBalancePeriod, balance);
      results.push(result);
    });

    if (this.hasAnomaly(results)) {
      const reasons = this.getAnomaliesReason(results);
      return httpResponse
        .status(HttpStatus.I_AM_A_TEAPOT)
        .json(new FailedSyncDataValidationResponse('Rejected', [...reasons]));
    }
    return httpResponse
      .status(HttpStatus.ACCEPTED)
      .json(new SuccededSyncDataValidationResponse('Accepted'));
  }

  private getMovementsByPeriod(period: Date, movements: MovementDTO[]) {
    let filteredMovements: MovementDTO[] = [];
    const periodMonth = period.getMonth();
    const periodYear = period.getFullYear();

    if (movements.length) {
      filteredMovements = [
        ...movements.filter(
          (movement: MovementDTO) =>
            movement.date.getMonth() === periodMonth &&
            movement.date.getFullYear() == periodYear,
        ),
      ];
    }

    return filteredMovements;
  }

  private getTotalMovementsAmount(movements: MovementDTO[]) {
    const totalAmount = 0;

    if (movements.length) {
      return movements.reduce(
        (accumulator: number, movement: MovementDTO) =>
          accumulator + movement.amount,
        totalAmount,
      );
    }

    return totalAmount;
  }

  private checkDataIntegrity(computedAmount: number, balance: BalanceDTO) {
    if (computedAmount === balance.balance) {
      return new SuccededSyncDataValidationResponse('Accepted');
    }
    const reason = new ReasonDTO();
    const period = `${(balance.date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${balance.date.getFullYear()}`;
    if (computedAmount > balance.balance) {
      reason.summary = 'Duplicates or Additional Data Noticed.';
      reason.details = `The total monthly transaction amount for the [${period}] period is greater than the checkpoint balance.`;
      reason.vigilancePoint = `Please verify the banking operations of the period: [${period}] !`;
      return new FailedSyncDataValidationResponse('Rejected', [reason]);
    }
    if (computedAmount < balance.balance) {
      reason.summary = 'Missing Data Noticed.';
      reason.details = `The total monthly transaction amount for the [${period}] period is less than the checkpoint balance.`;
      reason.vigilancePoint = `Please verify the banking operations of the period: [${period}] !`;
      return new FailedSyncDataValidationResponse('Rejected', [reason]);
    }
  }

  private hasAnomaly(results: AbstractResponse[]) {
    const anomalies = results.filter(
      (result) => result instanceof FailedSyncDataValidationResponse,
    );
    return anomalies.length > 0;
  }

  private getAnomaliesReason(results: AbstractResponse[]) {
    const reasons: ReasonDTO[] = [];
    const anomalies = results.filter(
      (result) => result instanceof FailedSyncDataValidationResponse,
    );
    anomalies.map((anomaly: FailedSyncDataValidationResponse) =>
      reasons.push(...anomaly.reasons),
    );
    return reasons;
  }
}
