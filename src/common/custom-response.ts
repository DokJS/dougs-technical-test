import { ReasonDTO } from '../sync-data-validation/dtos/reason.dto';

export abstract class AbstractResponse {
  constructor(protected message: string) {}
}

export class SuccededSyncDataValidationResponse extends AbstractResponse {
  constructor(protected message: string) {
    super(message);
  }
}

export class FailedSyncDataValidationResponse extends AbstractResponse {
  constructor(
    protected message: string,
    private reasons: ReasonDTO[],
  ) {
    super(message);
  }

  getReasons() {
    return this.reasons;
  }
}
