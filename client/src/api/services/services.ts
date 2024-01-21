import axios, { AxiosResponse } from 'axios';
import baseURL from '../config';
import Service from './types';
import errorResponse, { ErrorResponse } from '../../utils/response';
import Store from '../stores/types';
import { IdResponse, MessageResponse } from '../types';
import Offers from '../offers/types';

/**
 * Represents the base URL for the services API.
 */
const servicesURL = `${baseURL}/services`;

/**
 * Fetches all services.
 *
 * @returns {Promise<{ services: Service[] } | ErrorResponse | MessageResponse>} A promise
 * that resolves to an array of services or an error response.
 */
export async function getServices(): Promise<
  { services: Service[] } | ErrorResponse | MessageResponse
> {
  try {
    const response: AxiosResponse = await axios.get(`${servicesURL}`);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.services.getServices');
  }
}

/**
 * Adds a new service.
 *
 * @param {Omit<Service, 'service_id'>} service - The service data to be added, excluding
 * the 'service_id'.
 * @returns {Promise<Service | ErrorResponse | IdResponse | MessageResponse>} A promise that
 * resolves to the added service or an error response.
 */
export async function addService(
  service: Omit<Service, 'service_id'>,
): Promise<Service | ErrorResponse | IdResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.post(servicesURL, service);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.services.addService');
  }
}

/**
 * Updates an existing service.
 *
 * @param {Service} service - The updated service data.
 * @returns {Promise<Service | ErrorResponse | IdResponse | MessageResponse>} A promise
 * that resolves to the updated service or an error response.
 */
export async function updateService(
  service: Service,
): Promise<Service | ErrorResponse | IdResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.put(
      `${servicesURL}/${service.service_id}`,
      service,
    );
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.services.updateService');
  }
}

/**
 * Deletes a service.
 *
 * @param {string} service_id - The ID of the service to be deleted.
 * @returns {Promise<Service | ErrorResponse | IdResponse | MessageResponse>} A promise
 * that resolves to the deleted service or an error response.
 */
export async function deleteService(
  service_id: string,
): Promise<Service | ErrorResponse | IdResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.delete(`${servicesURL}/${service_id}`);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.services.deleteService');
  }
}

/**
 * Fetches stores associated with a specific service.
 *
 * @param {string} service_id - The ID of the service.
 * @returns {Promise<{ stores: Store[] } | MessageResponse | ErrorResponse>} A promise that
 * resolves to the data associated with the stores for the given service or an error response.
 */
export async function getStoresByServiceId(
  service_id: string,
): Promise<{ stores: Store[] } | MessageResponse | ErrorResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${servicesURL}/${service_id}/stores`);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.services.getStoresByServiceId');
  }
}

/**
 * Fetches offers associated with a specific service.
 *
 * @param {string} service_id - The ID of the service.
 * @returns {Promise<{ offers: Offers[] } | MessageResponse | ErrorResponse>} A promise that
 * resolves to the data associated with the offers for the given service or an error response.
 */
export async function getOffersByServiceId(
  service_id: string,
): Promise<{ offers: Offers[] } | MessageResponse | ErrorResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${servicesURL}/${service_id}/offers`);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.services.getOffersByServiceId');
  }
}

export default {
  getServices,
  addService,
  updateService,
  deleteService,
  getStoresByServiceId,
  getOffersByServiceId,
};
