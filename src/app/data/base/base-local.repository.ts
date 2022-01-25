import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BaseRepository } from './base.repository';

export abstract class BaseLocalRepository extends BaseRepository {
  constructor(httpClient: HttpClient, baseRoute: string, ignoreInterceptor: boolean = false) {
    super(httpClient, environment.serverUrl, baseRoute, ignoreInterceptor);
  }
}
