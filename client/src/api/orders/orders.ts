import axios, { AxiosResponse } from 'axios';
import baseURL from '../config';
import Order from './types';
import errorResponse, { ErrorResponse } from '../../utils/response';
import { IdResponse, MessageResponse } from '../types';
/**
 * Represents the base URL for the orders API.
 */
const ordersURL = `${baseURL}/orders`;

/**
 * Adds a new order.
 *
 * @param {Omit<Order, 'order_id'>} order - The order data without the order_id.
 * @returns {Promise<Order| MessageResponse| ErrorResponse | IdResponse>} A promise
 * that resolves to the added order or an error response.
 */
export default async function addOrder(
  order: Omit<Order, 'order_id'>,
): Promise<MessageResponse | ErrorResponse | IdResponse> {
  try {
    const response: AxiosResponse = await axios.post(ordersURL, order);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.orders.addOrder');
  }
}
