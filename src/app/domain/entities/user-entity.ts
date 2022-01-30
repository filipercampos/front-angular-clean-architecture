import { DomainEntity } from './base/domain-entity';
export class UserEntity extends DomainEntity {
  username: string = '';
  email: string = '';
  token?: string;
}
