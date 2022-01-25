import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverEntity } from '../../../domain/entities/driver-entity';
import { DriverUsecase } from '../../../domain/usecases/driver/driver-usecase';

@Injectable({
  providedIn: 'root',
})
export class DriverController {
  constructor(private usecaseService: DriverUsecase) {}

  get(id?: number): Observable<DriverEntity> {
    return this.usecaseService.get(id);
  }
  insert(param: DriverEntity): Observable<DriverEntity> {
    return this.usecaseService.insert(param);
  }
  update(param: DriverEntity): Observable<DriverEntity> {
    return this.usecaseService.update(param);
  }
  disableEnable(id: number, status: boolean): Observable<DriverEntity> {
    return this.usecaseService.disableEnable(id, status);
  }
}
