import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomHttpClient } from 'src/app/infra/custom-http-client/custom-http-client';

export abstract class BaseRepository {
  constructor(
    httpClient: HttpClient,
    serverUrl: string,
    baseRoute: string,
    ignoreInterceptor: boolean = false
  ) {
    this.basePath = baseRoute;
    this.customClient = new CustomHttpClient(httpClient, serverUrl, ignoreInterceptor);
  }
  public customClient: CustomHttpClient;
  protected basePath: string;

  protected getByIdRequest<T>(id: any, headers?: any | HttpHeaders): Observable<any> {
    return this.customClient.get<T>(`${this.basePath}/${id}`, undefined, headers);
  }
  protected getRequest<T>(
    params?: any | HttpParams | HttpParams,
    headers?: any | HttpHeaders
  ): Observable<any> {
    return this.customClient.get<T>(this.basePath, params, headers);
  }
  protected postRequest<T>(body?: any, headers?: any | HttpHeaders): Observable<any> {
    return this.customClient.post<T>(this.basePath, body, headers);
  }
  protected putRequest<T>(id?: any, body?: any, headers?: any | HttpHeaders): Observable<any> {
    return this.customClient.put<T>(`${this.basePath}/${id}`, body, headers);
  }
  protected patchRequest<T>(id?: any, body?: any, headers?: any | HttpHeaders): Observable<any> {
    return this.customClient.patch<T>(`${this.basePath}/${id}`, body, headers);
  }
  protected deleteRequest<T>(id?: number, headers?: any | HttpHeaders): Observable<any> {
    return this.customClient.delete<T>(`${this.basePath}/${id}`, headers);
  }
}
