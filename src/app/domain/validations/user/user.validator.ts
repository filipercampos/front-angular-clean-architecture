import { Injectable } from '@angular/core';
import { IValidator, ValidationResult, Validator } from 'ts.validator.fluent/dist';
import { UserEntity } from '../../entities/user-entity';
import { IValidatorMessage } from '../../interfaces/message/ivalidator-message';

@Injectable({
  providedIn: 'root',
})
export class UserValidator {
  constructor(protected validatorMessage: IValidatorMessage) {}

  validateFields(param: UserEntity): ValidationResult {
    return new Validator(param).Validate(this.validateRules);
  }

  validateRules = (validator: IValidator<UserEntity>): ValidationResult => {
    return validator
      .Length((m) => m.username, 4, 10, this.validatorMessage.maximumSize('Usuário', '10'))
      .Length((m) => m.password, 3, 10, this.validatorMessage.maximumSize('Senha', '10'))
      .ToResult();
  };
}
