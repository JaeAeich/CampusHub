import { ErrorResponse } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import errorResponse from '@/utils/response';
import { MessageResponse } from '../types';
import baseURL from '../config';
import Product from './types';
import Review from '../reviews/types';

/**
 * Represents the base URL for the services API.
 */
const productsURL = `${baseURL}/products`;

/**
 * Fetches all products based on search query.
 *
 * @param query - The search query.
 * @returns {Promise<{ products: Product[] } | ErrorResponse | MessageResponse>} A promise
 */
export default async function getProductsByQuery(
  query: string,
): Promise<{ products: Product[] } | MessageResponse | ErrorResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${productsURL}`, {
      params: { search_query: query },
    });
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.products') as MessageResponse | ErrorResponse;
  }
}

/**
 * Fetches all products based on search query.
 *
 * @param query - The search query.
 * @returns {Promise<{ products: Product[] } | ErrorResponse | MessageResponse>} A promise
 */
export async function getProductsBySearchQuery(
  query: string,
): Promise<{ products: Product[] } | MessageResponse | ErrorResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${productsURL}`, {
      params: { search_query: query },
    });
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.products') as MessageResponse | ErrorResponse;
  }
}
/**
 * Fetches all products based on search query.
 *
 * @param query - The search query.
 * @returns {Promise<{ products: Product[] } | ErrorResponse | MessageResponse>} A promise
 */
export async function getProductsByUserId(
  query: string,
): Promise<{ products: Product[] } | MessageResponse | ErrorResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${productsURL}`, {
      params: { user_id: query },
    });
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.products') as MessageResponse | ErrorResponse;
  }
}

/**
 * Fetches a product by its ID.
 *
 * @param {string} product_id - The ID of the product.
 * @returns {Promise<Product | ErrorResponse | MessageResponse>} A promise
 * that resolves to the product data or an error response.
 */
export async function getProductByProductId(
  product_id: string,
): Promise<Product | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${productsURL}`, {
      params: { product_id },
    });
    return response.data.products[0] as Product;
  } catch (error: unknown) {
    return errorResponse(error, 'api.products.getProductById') as MessageResponse | ErrorResponse;
  }
}

/**
 * Add a new Review to Product.
 *
 * @param {string} product_id - The ID of the product.
 * @param {Review} review - The review data to add.
 *
 * @returns {Promise<Product | ErrorResponse | MessageResponse>} A promise
 * that resolves to the product data or an error response.
 */
export async function addReviewToProduct(
  product_id: string,
  review: Review,
): Promise<Product | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.post(
      `${productsURL}/${product_id}/reviews`,
      review,
    );
    return response.data;
  } catch (error: unknown) {
    return errorResponse(error, 'api.products.addReviewToProduct') as
      | MessageResponse
      | ErrorResponse;
  }
}
