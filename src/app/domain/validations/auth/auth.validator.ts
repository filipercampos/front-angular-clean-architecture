import { Injectable } from '@angular/core';
import { IValidator, ValidationResult, Validator } from 'ts.validator.fluent/dist';
import { IValidatorMessage } from '../../interfaces/message/ivalidator-message';
import { AuthPostDto } from './../../dto/auth/auth-post.dto';

@Injectable({
  providedIn: 'root',
})
export class AuthValidator {
  constructor(protected validatorMessage: IValidatorMessage) {}

  validateFields(param: AuthPostDto): ValidationResult {
    return new Validator(param).Validate(this.validateRules);
  }

  validateRules = (validator: IValidator<AuthPostDto>): ValidationResult => {
    const result = validator
      .NotEmpty((m) => m.username, this.validatorMessage.required('Usuário'))
      .NotEmpty((m) => m.password, this.validatorMessage.required('Senha'))
      .ToResult();

    if (result.IsValid) {
      return validator
        .Length((m) => m.username, 4, 10, this.validatorMessage.maximumSize('Usuário', '10'))
        .Length((m) => m.password, 3, 32, this.validatorMessage.maximumSize('Senha', '10'))
        .ToResult();
    }
    return result;
  };
}
