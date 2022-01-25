import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthPostDto } from '../../dto/auth/auth-post.dto';
import { AuthValidator } from '../../validations/auth/auth.validator';
import { AuthRepository } from './../../../data/repository/auth/auth.repository';
import { UserRepository } from './../../../data/repository/user/user.repository';
import { JwtUtil } from './../../../shared/utils/jwt.util';
import { UserEntity } from './../../entities/user-entity';

@Injectable({
  providedIn: 'root',
})
export class AuthUsecase {
  constructor(
    private repository: AuthRepository,
    private userRepository: UserRepository,
    private validator: AuthValidator
  ) {}

  auth(param: AuthPostDto): Observable<UserEntity> {
    const validator = this.validator.validateFields(param);
    if (validator.IsValid) {
      return this.repository.postAccessToken(param).pipe(
        mergeMap((token: string) => {
          const data = JwtUtil.decodePayloadJWT(token);
          return this.userRepository.getById(data.id);
        })
      );
    } else {
      return throwError(() => validator.Errors);
    }
  }

  logout(): Observable<boolean> {
    return this.repository.logout();
  }
}
