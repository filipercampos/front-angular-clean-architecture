import { Injectable } from '@angular/core';
import { UserRepository } from '../../../data/repository/user/user.repository';
import { UserValidator } from '../../validations/user/user.validator';

@Injectable({
  providedIn: 'root',
})
export class UserUsecase {
  constructor(private repository: UserRepository, private validator: UserValidator) {}
}
