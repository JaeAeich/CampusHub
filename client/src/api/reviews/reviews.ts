import axios, { AxiosResponse } from 'axios';
import baseURL from '../config';
import Review from './types';
import errorResponse, { ErrorResponse } from '../../utils/response';
import { MessageResponse } from '../types';

/**
 * Represents the base URL for the reviews API.
 */
const reviewsURL = `${baseURL}/reviews`;

/**
 * Fetches all services.
 *
 * @returns {Promise<{ reviews: Review[] } | ErrorResponse | MessageResponse>} A promise
 * that resolves to an array of services or an error response.
 */
export default async function getReviews(): Promise<
  { reviews: Review[] } | ErrorResponse | MessageResponse
> {
  try {
    const response: AxiosResponse = await axios.get(`${reviewsURL}`);
    return response.data;

    return errorResponse(error, 'api.reviews.getReviews');
  }
}
