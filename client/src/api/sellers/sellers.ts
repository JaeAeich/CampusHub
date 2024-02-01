import axios, { AxiosResponse } from 'axios';
import baseURL from '../config';
import Seller, { SellerList } from './types';
import errorResponse, { ErrorResponse } from '../../utils/response';
import { IdResponse, MessageResponse } from '../types';
import Store from '../stores/types';

/**
 * Represents the base URL for the sellers API.
 */
const sellersURL = `${baseURL}/sellers`;

/**
 * Fetches a list of sellers.
 *
 * @returns {Promise<SellerList | ErrorResponse | MessageResponse>} A promise
 * that resolves to a list of sellers or an error response.
 */
export async function getSellers(): Promise<SellerList | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${sellersURL}`);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.sellers.getSellers');
  }
}

/**
 * Adds a new seller.
 *
 * @param {Omit<Seller, 'seller_id'>} seller - The seller data without the seller_id.
 * @returns {Promise<Seller | ErrorResponse | IdResponse | MessageResponse>} A promise
 * that resolves to the added seller or an error response.
 */
export async function addSeller(
  seller: Omit<Seller, 'seller_id'>,
): Promise<Seller | ErrorResponse | IdResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.post(sellersURL, seller);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.sellers.addSeller');
  }
}

/**
 * Adds a store to a specific seller.
 *
 * @param {string} seller_id - The ID of the seller.
 * @param {Store} store - The store data to be added.
 * @returns {Promise<ErrorResponse | MessageResponse>} A promise
 * that resolves to the added store or an error response.
 */
export async function add_store(
  seller_id: string,
  store: Store,
): Promise<ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.put(`${baseURL}/seller/${seller_id}/store`, store);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.sellers.updateSeller');
  }
}

/**
 * Exports the sellers API functions.
 */
export default {
  getSellers,
  addSeller,
  add_store,
};
