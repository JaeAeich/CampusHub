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
 * @param {Omit<User, 'user_id'>} user - The user data without the user_id.
 * @returns {Promise<User | ErrorResponse | IdResponse | MessageResponse>} A promise
 * that resolves to the added user or an error response.
 */
export default async function addUser(
  user: Omit<User, 'user_id'>,
): Promise<User | ErrorResponse | IdResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.post(usersURL, user);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.users.addUser');
  }
}
