import { UserEntity } from '@domain/entities/user-entity';

export class UserMapper {
  fromJson(param: UserEntity): UserEntity {
    return param;
  }
}
