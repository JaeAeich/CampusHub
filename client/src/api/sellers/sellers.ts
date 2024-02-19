import axios, { AxiosResponse } from 'axios';
import baseURL from '../config';
import Seller, { SellerList } from './types';
import Store, { StoreList } from '../stores/types';
import errorResponse, { ErrorResponse } from '../../utils/response';
import { IdResponse, MessageResponse } from '../types';

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
): Promise<ErrorResponse | IdResponse | MessageResponse> {
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
    const response: AxiosResponse = await axios.post(`${baseURL}/seller/${seller_id}/store`, store);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.sellers.add_store');
  }
}
/**
 * Fetches a seller by its email ID.
 *
 * @param {string} seller_email - The ID of the seller.
 * @returns {Promise<Seller | ErrorResponse | MessageResponse>} A promise
 * that resolves to the seller data or an error response.
 */
export async function getSellerById(
  seller_email: string,
): Promise<Seller | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${sellersURL}/${seller_email}`);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.sellers.getSellerById');
  }
}
/** Fetches a list of stores.
 *
 * @param {string} seller_id - The ID of the seller.
 * @returns {Promise<StoreList | ErrorResponse | MessageResponse>} A promise
 * that resolves to a list of stores or an error response.
 */
export async function getStoresBySellerId(
  seller_id: string,
): Promise<StoreList | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${sellersURL}/${seller_id}/stores`);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.sellers.getStoresBySellerId');
  }
}
/**
 * Exports the sellers API functions.
 */
export default {
  getSellers,
  addSeller,
  add_store,
  getSellerById,
  getStoresBySellerId,
};
