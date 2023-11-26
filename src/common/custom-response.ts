import { ReasonDTO } from 'src/sync-data-validation/dtos/reason.dto';

export abstract class AbstractResponse {
  protected _message: string;

  constructor(message: string) {
    this._message = message;
  }

  get message() {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}

export class SuccededSyncDataValidationResponse extends AbstractResponse {
  constructor(message: string) {
    super(message);
  }
}

export class FailedSyncDataValidationResponse extends AbstractResponse {
  private _reasons: ReasonDTO[];

  constructor(message: string, reasons: ReasonDTO[]) {
    super(message);
    this._reasons = [...reasons];
  }

  get reasons() {
    return this._reasons;
  }

  set reasons(value: ReasonDTO[]) {
    this._reasons = [...value];
  }
}
