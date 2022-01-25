import { DriverEntity } from '@domain/entities/driver-entity';
import * as moment from 'moment';
export class DriverMapper {
  fromJson(param: any): DriverEntity {
    param.birth_date = moment(param.birth_date).format('YYYY-MM-DD');
    return param;
  }
}
