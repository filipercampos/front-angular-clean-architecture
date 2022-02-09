import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseLocalRepository as BaseLocalRepository } from '@data/base/base-local.repository';
import { IRepository } from '@data/interfaces/ibase.repository';
import { UserEntity } from '@domain/entities/user-entity';
import { map, mergeMap, Observable } from 'rxjs';
import { ApiResources } from 'src/app/shared/constants/api_resources';
import { PostMessage } from 'src/app/shared/interface/post-reponse';
import { ResponseMessage } from 'src/app/shared/interface/response-message';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepository extends BaseLocalRepository implements IRepository {
  private mapper = new UserMapper();
  constructor(httpCliente: HttpClient) {
    super(httpCliente, ApiResources.USERS);
  }
  getById(id: number): Observable<UserEntity> {
    return this.getByIdRequest(id).pipe(map(this.mapper.fromJson));
  }
  get(): Observable<UserEntity> {
    return this.getRequest<UserEntity[]>()
      .pipe(mergeMap((item) => item))
      .pipe(map(this.mapper.fromJson));
  }
  post(body: UserEntity): Observable<PostMessage> {
    return this.post(body);
  }
  put(id: number, body: UserEntity): Observable<ResponseMessage> {
    return this.putRequest(id, body);
  }
  patch(id: number, body: UserEntity): Observable<ResponseMessage> {
    return this.patch(id, body);
  }
  delete(id: number): Observable<ResponseMessage> {
    return this.delete(id);
  }
}
