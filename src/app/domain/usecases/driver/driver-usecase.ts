import { Injectable } from '@angular/core';
import { DriverRepository } from '@data/repository/driver/driver.repository';
import { Observable, throwError } from 'rxjs';
import { DriverEntity } from '../../entities/driver-entity';
import { DriverValidator } from '../../validations/driver/driver-validator';

@Injectable({
  providedIn: 'root',
})
export class DriverUsecase {
  constructor(
    private motoristaRepository: DriverRepository,
    private driverValidator: DriverValidator
  ) {}

  get(id?: number): Observable<DriverEntity> {
    return this.motoristaRepository.get(id);
  }
  insert(param: DriverEntity): Observable<DriverEntity> {
    const validator = this.driverValidator.validateFields(param);

    if (validator.IsValid) {
      return this.motoristaRepository.insert(param);
    } else {
      return throwError(validator.Errors);
    }
  }
  update(param: DriverEntity): Observable<DriverEntity> {
    const validator = this.driverValidator.validateFields(param);

    if (validator.IsValid) {
      return this.motoristaRepository.update(param);
    } else {
      return throwError(validator.Errors);
    }
  }
  disableEnable(id: number, status: boolean): Observable<DriverEntity> {
    return this.motoristaRepository.disableEnable(id, status);
  }
}
