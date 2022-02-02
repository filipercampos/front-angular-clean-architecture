import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResources } from '@constants/api_resources';
import { BaseLocalRepository } from '@data/base/base-local.repository';
import { DriverEntity } from '@domain/entities/driver-entity';
import { IDialogController } from '@domain/interfaces/idialog-controller';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { DriverMapper } from './driver.mapper';

@Injectable()
export class DriverRepository extends BaseLocalRepository implements IDialogController {
  private mapper = new DriverMapper();
  constructor(httpClient: HttpClient) {
    super(httpClient, ApiResources.DRIVERS);
  }
  getById(id: number): Observable<DriverEntity> {
    return this.getByIdRequest(id).pipe(
      map((item) => {
        if (Array.isArray(item) && item[0]) {
          return this.mapper.fromJson(item[0]);
        }
        return item;
      })
    );
  }
  get(): Observable<DriverEntity> {
    return this.getRequest<DriverEntity[]>()
      .pipe(mergeMap((item) => item))
      .pipe(map(this.mapper.fromJson));
  }
  insert(param: DriverEntity): Observable<DriverEntity> {
    return this.postRequest<DriverEntity>(param).pipe(map(this.mapper.fromJson));
  }
  update(param: DriverEntity): Observable<DriverEntity> {
    return this.putRequest(param.id, param).pipe(map(this.mapper.fromJson));
  }
  disableEnable(id: number, status: boolean): Observable<DriverEntity> {
    return this.patchRequest(id, { enable: status }).pipe(map(this.mapper.fromJson));
  }
}
