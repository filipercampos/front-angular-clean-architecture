import { Observable } from 'rxjs';

export interface IRepository
  extends IGetRepository,
    IPostRepository,
    IPutRepository,
    IPatchRepository,
    IDeleteRepository {
  getById(id?: any): Observable<any>;
  get(params: any): Observable<any>;
  post(body: any): Observable<any>;
  put(id?: any, body?: any): Observable<any>;
  patch(id?: any, body?: any): Observable<any>;
  delete(id: number): Observable<any>;
}
export interface IGetRepository {
  get(params: any): Observable<any>;
}
export interface IPostRepository {
  post(param: any): Observable<any>;
}
export interface IPutRepository {
  put(id?: any, body?: any): Observable<any>;
}
export interface IPatchRepository {
  patch(id?: any, body?: any): Observable<any>;
}

export interface IDeleteRepository {
  delete(id?: any): Observable<any>;
}
