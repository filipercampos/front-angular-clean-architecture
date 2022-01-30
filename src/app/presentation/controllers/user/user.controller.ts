import { Injectable } from '@angular/core';
import { AuthPostDto } from '@domain/dto/auth/auth-post.dto';
import { UserEntity } from '@domain/entities/user-entity';
import { Observable } from 'rxjs';
import { AuthUsecase as AuthUsecase } from '../../../domain/usecases/auth/auth.usecase';

@Injectable({
  providedIn: 'root',
})
export class UserController {
  constructor(public usecase: AuthUsecase) {}

  login(param: AuthPostDto): Observable<UserEntity> {
    return this.usecase.auth(param);
  }

  logout(): Observable<boolean> {
    return this.usecase.logout();
  }
}
