import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IValidatorMessage } from './interfaces/message/ivalidator-message';
import { ValidatorMessageService } from './message/validator-message.service';
import { AuthUsecase } from './usecases/auth/auth.usecase';
import { DriverUsecase } from './usecases/driver/driver-usecase';
import { AuthValidator } from './validations/auth/auth.validator';
import { DriverValidator } from './validations/driver/driver-validator';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    //validator
    { provide: IValidatorMessage, useClass: ValidatorMessageService },
    AuthValidator, //validator
    DriverValidator, //validator
    AuthUsecase,
    DriverUsecase,
  ],
})
export class DomainModule {}
