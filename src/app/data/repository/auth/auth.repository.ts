import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResources } from '@constants/api_resources';
import { BaseLocalRepository } from '@data/base/base-local.repository';
import { AuthPostDto } from '@domain/dto/auth/auth-post.dto';
import { map, Observable, of } from 'rxjs';

@Injectable()
export class AuthRepository extends BaseLocalRepository {
  constructor(http: HttpClient) {
    super(http, ApiResources.ACCESS_TOKEN);
  }

  /**
   * Get Access Token
   */
  postAccessToken(body: AuthPostDto): Observable<string> {
    return this.customClient.get(ApiResources.ACCESS_TOKEN, body).pipe<any>(
      map((item) => {
        if (item && item[0].token) {
          return item[0].token;
        }
        throw Error(item.toString());
      })
    );
  }

  /**
   * Refresh access token
   */
  postRefreshToken(token: string): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-API-Key': token,
    });
    return this.customClient.get(ApiResources.REFRESH_TOKEN, headers).pipe<any>(
      map((item) => {
        if (item.token) {
          return item.token;
        }
        throw Error(item.toString());
      })
    );
  }

  logout(): Observable<boolean> {
    return of(true);
  }
}
