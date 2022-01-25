import { DomainEntity } from './base/domain-entity';
export class AddressEntity extends DomainEntity {
  name: string = '';
  state: string = '';
  country: string = '';
  neighborhood: string = '';
  city: string = '';
  street_number: string = '';
  complement: string = '';
  postal_code: string = '';
  street_name: string = '';
}
