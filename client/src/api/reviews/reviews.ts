import axios, { AxiosResponse } from 'axios';
import baseURL from '../config';
import User from './types';
import errorResponse, { ErrorResponse } from '../../utils/response';

/**
 * Represents the base URL for the reviews API.
 */
const reviewsURL = `${baseURL}/reviews`;

/**
 * Gets all reviews.
 *
 * param {string} store_id - The ID of the store.
 * param {string} product_id - The ID of the product.
 *
 * @returns {Promise<User[] | ErrorResponse>} A promise that resolves to the list of reviews or an error response.
 */
export default async function getReviews(
  store_id: string,
  product_id: string,
): Promise<User[] | ErrorResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${reviewsURL}`, {
      params: { store_id, product_id },
    });
    return response.data;
  } catch (error) {
    return errorResponse(error, 'api.reviews.getReviews');
  }
}
