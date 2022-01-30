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
  protected logRequest: boolean = true;

  public get<T>(
    path: string,
    params?: any | HttpParams | HttpParams,
    headers?: any | HttpHeaders
  ): Observable<any> {
    const p = this._createHttpParams(params);
    const h = this._createHttpHeaders(headers);
    const options: any = {
      ...h,
      params: p,
    };
    this.handleLog(HttpRequestEnum.GET, path, undefined, params, headers);
    return this.httpClient.get<T>(`${this.baseUrl}/${path}`, options);
  }
  public post<T>(path: string, body?: any, headers?: any | HttpHeaders): Observable<any> {
    this.handleLog(HttpRequestEnum.POST, path, body, undefined, headers);
    const h = this._createHttpHeaders(headers);
    return this.httpClient.post<T>(`${this.baseUrl}/${path}`, body, h);
  }

  public put<T>(path: string, body?: any, headers?: any | HttpHeaders): Observable<any> {
    this.handleLog(HttpRequestEnum.PUT, path, body, undefined, headers);
    const h = this._createHttpHeaders(headers);
    return this.httpClient.put<T>(`${this.baseUrl}/${path}`, body, h);
  }

  public patch<T>(path: string, body?: any, headers?: any | HttpHeaders): Observable<any> {
    this.handleLog(HttpRequestEnum.PATCH, path, body, undefined, headers);
    const h = this._createHttpHeaders(headers);
    return this.httpClient.patch<T>(`${this.baseUrl}/${path}`, body, h);
  }

  public delete<T>(path: string, body?: any, headers?: any | HttpHeaders): Observable<any> {
    this.handleLog(HttpRequestEnum.DELETE, path, body, undefined, headers);
    const h = this._createHttpHeaders(headers);
    return this.httpClient.delete<T>(`${this.baseUrl}/${path}`, h);
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
    let params = new HttpParams();
    for (const [key, value] of Object.entries<any>(o)) {
      params = params.append(key, value);
    }
    return params;
  }
  private _createHttpHeaders(o: any): any {
    if (!o) return;
    if (o instanceof HttpHeaders) return o;
    let params = new HttpHeaders();
    for (const [key, value] of Object.entries<any>(o)) {
      params = params.append(key, value + '');
    }
    return { headers: params };
  }
  private handleLog(type: HttpRequestEnum, path: string, body: any, params: any, headers: any) {
    if (this.logRequest == true) {
      console.info(`Request ${HttpRequestEnum[type]}`);
      console.info(`===============================================================`);
      console.info(`${this.baseUrl}/${path}`);
      console.info(`===============================================================`);
      if (params) {
        console.info(`Query : ${JSON.stringify(params)}`);
        console.info(`===============================================================`);
      }
      if (headers) {
        console.info(`Headers : ${JSON.stringify(headers)}`);
        console.info(`===============================================================`);
      }
      if (body) {
        console.info(`Body : ${JSON.stringify(body)}`);
        console.info(`===============================================================`);
      }
    }
  }
}
