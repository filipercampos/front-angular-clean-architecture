import { Observable } from 'rxjs';
import { DriverEntity } from '../entities/driver-entity';

export abstract class IDialogController {
  abstract get(): Observable<DriverEntity>;
  abstract getById(id?: number): Observable<DriverEntity>;
  abstract insert(param: DriverEntity): Observable<DriverEntity>;
  abstract update(param: DriverEntity): Observable<DriverEntity>;
  abstract disableEnable(id: number, status: boolean): Observable<DriverEntity>;
}
