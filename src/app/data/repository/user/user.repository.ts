import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResources } from '@constants/api_resources';
import { BaseLocalRepository as BaseLocalRepository } from '@data/base/base-local.repository';
import { IRepository } from '@data/interfaces/ibase.repository';
import { PostMessage } from '@data/interfaces/post-reponse';
import { ResponseMessage } from '@data/interfaces/response-message';
import { UserEntity } from '@domain/entities/user-entity';
import { map, Observable } from 'rxjs';

@Injectable()
export class UserRepository extends BaseLocalRepository implements IRepository {
  constructor(httpCliente: HttpClient) {
    super(httpCliente, ApiResources.USERS);
  }
  getById(id: number): Observable<UserEntity> {
    return this.getByIdRequest(id).pipe(
      map((item) => {
        if (item) {
          return item;
        }
        this.handleResponseRequest(item);
      })
    );
  }
  get(params: any): Observable<UserEntity> {
    return super.getRequest(params);
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
