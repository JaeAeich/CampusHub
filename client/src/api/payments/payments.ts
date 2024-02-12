import axios, { AxiosResponse } from 'axios';
import baseURL from '../config';
import Payment from './types';
import errorResponse, { ErrorResponse } from '../../utils/response';
import { IdResponse, MessageResponse } from '../types';

const paymentsURL = `${baseURL}/payments`;

/**
 * Adds a new payment.
 *
 * @param {Omit<Payment, 'payment_id'>} payment - The payment data without the payment_id.
 * @returns {Promise<Payment | ErrorResponse | IdResponse | MessageResponse>} A promise
 * that resolves to the added payment or an error response.
 */
export default async function addPayment(
  payment: Omit<Payment, 'payment_id'>,
): Promise<Payment | ErrorResponse | IdResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.post(paymentsURL, payment);
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.payments.addPayment');
  }
}