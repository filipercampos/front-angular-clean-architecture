import { Injectable } from '@angular/core';
import { DriverRepository } from '@data/repository/driver/driver.repository';
import { DriverEntity } from '@domain/entities/driver-entity';
import { Observable, throwError } from 'rxjs';
import { DriverValidator } from '../../validations/driver/driver-validator';

@Injectable({
  providedIn: 'root',
})
export class DriverUsecase {
  constructor(private repository: DriverRepository, private driverValidator: DriverValidator) {}

  getById(id: number): Observable<DriverEntity> {
    return this.repository.getById(id);
  }
  get(): Observable<DriverEntity> {
    return this.repository.get();
  }
  insert(param: DriverEntity): Observable<DriverEntity> {
    const validator = this.driverValidator.validateFields(param);

    if (validator.IsValid) {
      return this.repository.insert(param);
    } else {
      return throwError(() => validator.Errors);
    }
  }
  update(param: DriverEntity): Observable<DriverEntity> {
    const validator = this.driverValidator.validateFields(param);

    if (validator.IsValid) {
      return this.repository.update(param);
    } else {
      return throwError(() => validator.Errors);
    }
  }

  delete(item: DriverEntity): Observable<void> {
    return this.repository.delete(item);
  }

  disableEnable(id: number, status: boolean): Observable<DriverEntity> {
    return this.repository.disableEnable(id, status);
  }
}
