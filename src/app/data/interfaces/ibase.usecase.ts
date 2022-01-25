import { Observable } from 'rxjs';

export interface IUsecase
  extends IGetUsecase,
    IPostUsecase,
    IPutUsecase,
    IPatchUsecase,
    IDeleteUsecase {
  getById(id?: any): Observable<any>;
  get(params: any): Observable<any>;
  post(body: any): Observable<any>;
  put(id?: any, body?: any): Observable<any>;
  patch(id?: any, body?: any): Observable<any>;
  delete(id: number): Observable<any>;
}
export interface IGetUsecase {
  get(params: any): Observable<any>;
}
export interface IPostUsecase {
  post(param: any): Observable<any>;
}
export interface IPutUsecase {
  put(id?: any, body?: any): Observable<any>;
}
export interface IPatchUsecase {
  patch(id?: any, body?: any): Observable<any>;
}

export interface IDeleteUsecase {
  delete(id?: any): Observable<any>;
}
