import { CarInterface } from 'interfaces/car';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface RentalInterface {
  id?: string;
  car_id?: string;
  renter_id?: string;
  start_date: any;
  end_date: any;
  status: string;
  created_at?: any;
  updated_at?: any;

  car?: CarInterface;
  user?: UserInterface;
  _count?: {};
}

export interface RentalGetQueryInterface extends GetQueryInterface {
  id?: string;
  car_id?: string;
  renter_id?: string;
  status?: string;
}
