import { Injectable } from '@angular/core';
import { IValidator, ValidationResult, Validator } from 'ts.validator.fluent/dist';
import { DocumentEntity } from '../../entities/document-entity';
import { DriverEntity } from '../../entities/driver-entity';
import { IValidatorMessage } from '../../interfaces/message/ivalidator-message';

@Injectable({
  providedIn: 'root',
})
export class DriverValidator {
  constructor(protected validatorMessage: IValidatorMessage) {}

  validateFields(param: DriverEntity): ValidationResult {
    return new Validator(param).Validate(this.validateRules);
  }

  validateRules = (validator: IValidator<DriverEntity>): ValidationResult => {
    return validator
      .NotEmpty((m) => m.name, this.validatorMessage.required('Nome'))
      .NotNull((m) => m.birth_date, this.validatorMessage.required('Data de Nascimento'))
      .If(
        (m) => m.documents != null && m.documents.length > 0,
        (v) => v.ForEach((m) => m.documents, this.validateDocumentsRules).ToResult()
      )
      .ToResult();
  };

  validateDocumentsRules = (validator: IValidator<DocumentEntity>): ValidationResult => {
    return validator
      .NotEmpty((m) => m.doc_type, this.validatorMessage.required('Tipo de documento'))
      .If(
        (m) => m.doc_type !== '',
        (v: IValidator<DocumentEntity>): ValidationResult => {
          return v
            .NotEmpty((m) => m.number, this.validatorMessage.required('Número de documento'))
            .If(
              (m) => m.doc_type === 'CNH',
              (c) =>
                c
                  .NotEmpty((m) => m.category, this.validatorMessage.required('Categoria da CNH'))
                  .ToResult()
            )
            .ToResult();
        }
      )
      .ToResult();
  };
}
