import * as automapper from 'automapper-ts';
import { UserEntity } from '../../../domain/entities/user-entity';
import { Mapper } from '../../base/mapper';

export class UserMapper implements Mapper<UserEntity, UserEntity> {
  fromJson(param: UserEntity): UserEntity {
    automapper.createMap('UserEntity', UserEntity);

    return automapper.map('UserEntity', UserEntity, param);
  }

  mapTo(param: UserEntity): UserEntity {
    automapper.createMap('UserEntity', UserEntity);

    return automapper.map('UserEntity', UserEntity, param);
  }
}
