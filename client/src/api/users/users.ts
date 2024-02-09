import axios, { AxiosResponse } from 'axios';
import baseURL from '../config';
import User from './types';
import errorResponse, { ErrorResponse } from '../../utils/response';
import { IdResponse, MessageResponse } from '../types';

/**
 * Represents the base URL for the sellers API.
 */
const usersURL = `${baseURL}/users`;


/**
 * Adds a new user.
 *
 * @param {Omit<User, 'user_id' | 'cart_id' | 'wishlist_cart_id' | 'order_ids'>} user - The user data without the respective ids.
 * @returns {Promise<User | ErrorResponse | IdResponse | MessageResponse>} A promise
 * that resolves to the added user or an error response.
 */
export default async function addUser(
  user: Omit<User, 'user_id' | 'cart_id' | 'wishlist_cart_id' | 'order_ids'>
): Promise<User | ErrorResponse | IdResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.post(usersURL, user);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.users.addUser');
  }
}
/**
 * Fetches a user by its email ID.
 *
 * @param {string} user_email - The ID of the user.
 * @returns {Promise<User | ErrorResponse | MessageResponse>} A promise
 * that resolves to the user data or an error response.
 */
export async function getUserById(
    user_email: string,
  ): Promise<User | ErrorResponse | MessageResponse> {
    try {
      const response: AxiosResponse = await axios.get(`${usersURL}/${user_email}`);
      return response.data;
    } catch (error) {
      return errorResponse(Error.toString(), 'api.users.getUserById');
    }
  }
