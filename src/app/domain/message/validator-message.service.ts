import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IValidatorMessage } from '../interfaces/message/ivalidator-message';

@Injectable()
export class ValidatorMessageService implements IValidatorMessage {
  constructor(private translate: TranslateService) {}

  required(field: string) {
    return this.translate.instant('validateRequired', {
      0: field,
    });
  }
  maximumSize(field: string, characters: string) {
    return this.translate.instant('validateMaximumSize', {
      0: field,
      1: characters,
    });
  }
}
