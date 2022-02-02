import { Mapper } from '@data/base/mapper';
import { UserEntity } from '@domain/entities/user-entity';

export class UserMapper extends Mapper<UserEntity> {
  fromJson(param: any): UserEntity {
    return param;
  }
}
