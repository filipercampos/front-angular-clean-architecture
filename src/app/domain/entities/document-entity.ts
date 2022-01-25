import { DomainEntity } from './base/domain-entity';
export class DocumentEntity extends DomainEntity {
  expires_at: Date | null = null;
  country: string = '';
  number: string = '';
  doc_type: string = '';
  category: string = '';
}
