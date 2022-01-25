import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestEnum } from './http-request.enum';
export class CustomHttpClient {
  constructor(private httpClient: HttpClient, baseUrl: string, ignoreInterceptor: boolean = false) {
    this.baseUrl = baseUrl;
    this.ignoreInterceptor = ignoreInterceptor;
  }
  private readonly baseUrl: string;
  protected readonly ignoreInterceptor: boolean;

  public get<T>(
    path: string,
    params?: any | HttpParams | HttpParams,
    headers?: any | HttpHeaders
  ): Observable<any> {
    const p = this._createHttpParams(params);
    const h = this._createHttpHeaders(headers);
    const options = {
      params: p,
      headers: h,
    };
    return this.httpClient.get<T>(`${this.baseUrl}/${path}`, options);
  }
  public post<T>(path: string, body?: any, headers?: any | HttpHeaders): Observable<any> {
    const h = this._createHttpHeaders(headers);
    return this.httpClient.post<T>(`${this.baseUrl}/${path}`, body, { headers: h });
  }

  public put<T>(path: string, body?: any, headers?: any | HttpHeaders): Observable<any> {
    const h = this._createHttpHeaders(headers);
    return this.httpClient.put<T>(`${this.baseUrl}/${path}`, body, { headers: h });
  }

  public patch<T>(path: string, body?: any, headers?: any | HttpHeaders): Observable<any> {
    const h = this._createHttpHeaders(headers);
    return this.httpClient.patch<T>(`${this.baseUrl}/${path}`, body, { headers: h });
  }

  public delete<T>(path: string, headers?: any | HttpHeaders): Observable<any> {
    const h = this._createHttpHeaders(headers);
    return this.httpClient.delete<T>(`${this.baseUrl}/${path}`, { headers: h });
  }

  public request<T>(
    requestType: HttpRequestEnum,
    path: string,
    params?: any | HttpParams | HttpParams,
    body?: any,
    headers?: any | HttpHeaders
  ): Observable<any> {
    switch (requestType) {
      case HttpRequestEnum.GET:
        return this.get<T>(path, params, headers);
      case HttpRequestEnum.POST:
        return this.post<T>(path, body, headers);
      case HttpRequestEnum.PUT:
        return this.put<T>(path, body, headers);
      case HttpRequestEnum.PATCH:
        return this.patch<T>(path, headers);
      case HttpRequestEnum.DELETE:
        return this.delete<T>(path, headers);
    }
  }

  private _createHttpParams(o: any) {
    if (!o) return;
    if (o instanceof HttpParams) return o;
    const params = new HttpParams();
    for (const [key, value] of Object.entries<any>(o)) {
      params.set(key, value);
    }
    return params;
  }
  private _createHttpHeaders(o: any) {
    if (!o) return;
    if (o instanceof HttpHeaders) return o;
    const params = new HttpHeaders();
    for (const [key, value] of Object.entries<any>(o)) {
      params.set(key, value);
    }
    return params;
  }
}
