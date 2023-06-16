import { RentalInterface } from 'interfaces/rental';
import { RentalAgencyInterface } from 'interfaces/rental-agency';
import { GetQueryInterface } from 'interfaces';

export interface CarInterface {
  id?: string;
  make: string;
  model: string;
  year: number;
  availability: boolean;
  rental_agency_id?: string;
  created_at?: any;
  updated_at?: any;
  rental?: RentalInterface[];
  rental_agency?: RentalAgencyInterface;
  _count?: {
    rental?: number;
  };
}

export interface CarGetQueryInterface extends GetQueryInterface {
  id?: string;
  make?: string;
  model?: string;
  rental_agency_id?: string;
}
