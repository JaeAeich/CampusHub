import axios, { AxiosResponse } from 'axios';
import baseURL from '../config';
import errorResponse, { ErrorResponse } from '../../utils/response';
import { IdResponse, MessageResponse } from '../types';
import Offers from './types';

/**
 * Represents the base URL for the offers API.
 */
const offersURL = `${baseURL}/offers`;

/**
 * Fetches all offers.
 *
 * @returns {Promise<{ offers: Offers[] } | ErrorResponse | MessageResponse>} A promise
 * that resolves to an array of offers or an error response.
 */
export async function getOffers(): Promise<{ offers: Offers[] } | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${offersURL}`);
    return response.data;
  } catch (error: unknown) {
    /**
     * Handles errors and generates an appropriate error response.
     *
     * @param {unknown} error - The error object.
     * @param {string} methodName - The name of the method where the error occurred.
     * @returns {ErrorResponse} An object representing the API response with error information.
     */
    return errorResponse(error, 'api.offers.get_offers');
  }
}

/**
 * Fetches trending offers.
 *
 * @returns {Promise<{ offers: Offers[] } | ErrorResponse | MessageResponse>} A promise
 * that resolves to an array of trending offers or an error response.
 */
export async function getTrendingOffers(): Promise<
  { offers: Offers[] } | ErrorResponse | MessageResponse
> {
  try {
    const response: AxiosResponse = await axios.get(`${offersURL}/trending`);
    return response.data;
  } catch (error: unknown) {
    /**
     * Handles errors and generates an appropriate error response.
     *
     * @param {unknown} error - The error object.
     * @param {string} methodName - The name of the method where the error occurred.
     * @returns {ErrorResponse} An object representing the API response with error information.
     */
    return errorResponse(error, 'api.offers.get_trending_offers');
  }
}

/**
 * Deletes an offer.
 *
 * @param {string} offer_id - The ID of the offer to be deleted.
 * @returns {Promise<IdResponse | ErrorResponse | MessageResponse>} A promise
 * that resolves to the deleted offer or an error response.
 */
export async function deleteOffer(
  offer_id: string,
): Promise<IdResponse | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.delete(`${offersURL}/${offer_id}`);
    return response.data;
  } catch (error: unknown) {
    /**
     * Handles errors and generates an appropriate error response.
     *
     * @param {unknown} error - The error object.
     * @param {string} methodName - The name of the method where the error occurred.
     * @returns {ErrorResponse} An object representing the API response with error information.
     */
    return errorResponse(error, 'api.offers.delete_offers');
  }
}

/**
 * Updates an existing offer.
 *
 * @param {string} offer_id - The ID of the offer to be updated.
 * @param {Offers} offer - The updated offer data.
 * @returns {Promise<Offers | ErrorResponse | MessageResponse>} A promise
 * that resolves to the updated offer or an error response.
 */
export async function updateOffer(
  offer_id: string,
  offer: Offers,
): Promise<Offers | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.put(`${offersURL}/${offer_id}`, offer);
    return response.data;
  } catch (error: unknown) {
    /**
     * Handles errors and generates an appropriate error response.
     *
     * @param {unknown} error - The error object.
     * @param {string} methodName - The name of the method where the error occurred.
     * @returns {ErrorResponse} An object representing the API response with error information.
     */
    return errorResponse(error, 'api.offers.update_offers');
  }
}
