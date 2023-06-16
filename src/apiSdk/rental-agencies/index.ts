import axios from 'axios';
import queryString from 'query-string';
import { RentalAgencyInterface, RentalAgencyGetQueryInterface } from 'interfaces/rental-agency';
import { GetQueryInterface } from '../../interfaces';

export const getRentalAgencies = async (query?: RentalAgencyGetQueryInterface) => {
  const response = await axios.get(`/api/rental-agencies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createRentalAgency = async (rentalAgency: RentalAgencyInterface) => {
  const response = await axios.post('/api/rental-agencies', rentalAgency);
  return response.data;
};

export const updateRentalAgencyById = async (id: string, rentalAgency: RentalAgencyInterface) => {
  const response = await axios.put(`/api/rental-agencies/${id}`, rentalAgency);
  return response.data;
};

export const getRentalAgencyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/rental-agencies/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteRentalAgencyById = async (id: string) => {
  const response = await axios.delete(`/api/rental-agencies/${id}`);
  return response.data;
};
