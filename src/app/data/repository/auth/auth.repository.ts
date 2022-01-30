import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResources } from '@constants/api_resources';
import { BaseRepository } from '@data/base/base.repository';
import { AuthPostDto } from '@domain/dto/auth/auth-post.dto';
import { environment } from '@environment/environment';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthRepository extends BaseRepository {
  constructor(http: HttpClient) {
    super(http, environment.serverAuthUrl, ApiResources.ACCESS_TOKEN);
  }

  /**
   * Get Access Token
   */
  postAccessToken(body: AuthPostDto): Observable<string> {
    return this.customClient.post(ApiResources.ACCESS_TOKEN, body).pipe<any>(
      map((item) => {
        if (item.token) {
          return item.token;
        }
        this.handleResponseRequest(item);
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
  /**
   * Get Access Token
   */
  getTest() {
    return this.customClient.get(
      'test/1',
      { params1: 'p-1' },
      {
        header1: 'h-zero',
      }
    );
  }
}
