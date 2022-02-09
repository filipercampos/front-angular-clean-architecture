import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverEntity } from '../../../domain/entities/driver-entity';
import { DriverUsecase } from '../../../domain/usecases/driver/driver-usecase';

@Injectable({
  providedIn: 'root',
})
export class DriverController {
  constructor(private usecaseService: DriverUsecase) {}

  getById(id: number): Observable<DriverEntity> {
    return this.usecaseService.getById(id);
  }
  get(): Observable<DriverEntity> {
    return this.usecaseService.get();
  }
  insert(param: DriverEntity): Observable<DriverEntity> {
    return this.usecaseService.insert(param);
  }
  update(param: DriverEntity): Observable<DriverEntity> {
    return this.usecaseService.update(param);
  }
  delete(item: DriverEntity): Observable<void> {
    return this.usecaseService.delete(item);
  }
  disableEnable(id: number, status: boolean): Observable<DriverEntity> {
    return this.usecaseService.disableEnable(id, status);
  }
}
