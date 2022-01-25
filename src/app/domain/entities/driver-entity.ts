import { AddressEntity } from './address-entity';
import { DomainEntity } from './base/domain-entity';
import { DocumentEntity } from './document-entity';
export class DriverEntity extends DomainEntity {
  name: string = '';
  birth_date: Date | null = null;
  phone: string = '';
  state: string = '';
  city: string = '';
  enable: boolean = false;
  address: AddressEntity | null = null;
  documents: DocumentEntity[] = [];
}
