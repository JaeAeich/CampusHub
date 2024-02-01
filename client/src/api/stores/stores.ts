import axios, { AxiosResponse } from 'axios';
import baseURL from '../config';
import errorResponse, { ErrorResponse } from '../../utils/response';
import { IdResponse, MessageResponse } from '../types';
import Store from './types';
import Offers from '../offers/types';
import Review from '../reviews/types';
import Product from '../products/types';
import Order from '../orders/types';

/**
 * Represents the base URL for the store API.
 */
const storeURL = `${baseURL}/stores`;

/**
 * Fetches trending stores.
 *
 * @returns {Promise<{ stores: Store[] } | ErrorResponse | MessageResponse>} A promise
 * that resolves to an array of trending stores or an error response.
 */
export async function getTrendingStore(): Promise<
  { stores: Store[] } | ErrorResponse | MessageResponse
> {
  try {
    const response: AxiosResponse = await axios.get(`${storeURL}/trending`);
    return response.data;
  } catch (error) {
    /**
     * Handles errors and generates an appropriate error response.
     *
     * @param {unknown} error - The error object.
     * @returns {ErrorResponse} An object representing the API response with error information.
     */
    return errorResponse(Error.toString(), 'api.store.getTrendingStore');
  }
}

/**
 * Fetches a store by its ID.
 *
 * @param {string} store_id - The ID of the store.
 * @returns {Promise<Store | ErrorResponse | MessageResponse>} A promise
 * that resolves to the store data or an error response.
 */
export async function getStoreById(
  store_id: string,
): Promise<Store | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${storeURL}/${store_id}`);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.getStoreById');
  }
}

/**
 * Fetches a product by its ID.
 * @param {string} store_id - The ID of the store.
 * @param {string} product_id - The ID of the product.
 * @returns {Promise<Product | ErrorResponse | MessageResponse>} A promise
 * that resolves to the product data or an error response.
 */
export async function getProductById(
  store_id: string,
  product_id: string,
): Promise<Product | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(
      `${storeURL}/${store_id}/products/${product_id}`,
    );
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.product.getProductById');
  }
}

/**
 * Fetches offers associated with a specific store.
 *
 * @param {string} store_id - The ID of the store.
 * @returns {Promise<{ offers: Offers[] } | ErrorResponse | MessageResponse>} A promise
 * that resolves to the data associated with the offers for the given store or an error response.
 */
export async function getOffersByStoreId(
  store_id: string,
): Promise<{ offers: Offers[] } | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${storeURL}/${store_id}/offers`);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.getOffersByStoreId');
  }
}

/**
 * Fetches reviews associated with a specific store.
 *
 * @param {string} store_id - The ID of the store.
 * @returns {Promise<Review | ErrorResponse | MessageResponse>} A promise
 * that resolves to the data associated with the reviews for the given store or an error response.
 */
export async function getReviewsByStoreId(
  store_id: string,
): Promise<Review | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${storeURL}/${store_id}/reviews`);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.getReviewsByStoreId');
  }
}

/**
 * Fetches orders associated with a specific store.
 *
 * @param {string} store_id - The ID of the store.
 * @returns {Promise<{ orders: Order[] } | ErrorResponse | MessageResponse>} A promise
 * that resolves to the data associated with the orders for the given store or an error response.
 */
export async function getOrdersByStoreId(
  store_id: string,
): Promise<{ orders: Order[] } | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${storeURL}/${store_id}/orders`);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.getOrdersByStoreId');
  }
}

/**
 * Fetches products associated with a specific store.
 *
 * @param {string} store_id - The ID of the store.
 * @returns {Promise<{ products: Product[] } | ErrorResponse | MessageResponse>} A promise
 * that resolves to the data associated with the products for the given store or an error response.
 */
export async function getProductsByStoreId(
  store_id: string,
): Promise<{ products: Product[] } | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.get(`${storeURL}/${store_id}/products`);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.getProductsByStoreId');
  }
}

/**
 * Updates store information.
 *
 * @param {string} store_id - The ID of the store to be updated.
 * @param {Store} store - The updated store data.
 * @returns {Promise<IdResponse | ErrorResponse | MessageResponse>} A promise
 * that resolves to the updated store or an error response.
 */
export async function updateStore(
  store_id: string,
  store: Store,
): Promise<IdResponse | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.put(`${storeURL}/${store_id}`, store);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.updateStore');
  }
}

/**
 * Deletes a store.
 *
 * @param {string} store_id - The ID of the store to be deleted.
 * @returns {Promise<IdResponse | ErrorResponse | MessageResponse>} A promise
 * that resolves to the deleted store or an error response.
 */
export async function deleteStore(
  store_id: string,
): Promise<IdResponse | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.delete(`${storeURL}/${store_id}`);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.deleteStore');
  }
}

/**
 * Adds an offer to a specific store.
 *
 * @param {string} store_id - The ID of the store.
 * @param {Offers} offers - The offer data to be added.
 * @returns {Promise<IdResponse | ErrorResponse | MessageResponse>} A promise
 * that resolves to the added offer or an error response.
 */
export async function addOffer(
  store_id: string,
  offers: Offers,
): Promise<IdResponse | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.post(`${storeURL}/${store_id}/offers`, offers);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.addOffer');
  }
}

/**
 * Adds a product to a specific store.
 *
 * @param {string} store_id - The ID of the store.
 * @param {Product} product - The product data to be added.
 * @returns {Promise<{ stores: Store[] } | ErrorResponse | MessageResponse>} A promise
 * that resolves to the added product or an error response.
 */
export async function addProduct(
  store_id: string,
  product: Product,
): Promise<{ stores: Store[] } | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.post(`${storeURL}/${store_id}/products`, product);
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.addProduct');
  }
}

/**
 * Updates a product in the store.
 *
 * @param {string} store_id - The ID of the store.
 * @param {string} product_id - The ID of the product to be updated.
 * @param {Product} product - The updated product information.
 * @returns {Promise<IdResponse | ErrorResponse | MessageResponse>} A promise resolving to the response data.
 */
export async function updateProduct(
  store_id: string,
  product_id: string,
  product: Product,
): Promise<IdResponse | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.put(
      `${storeURL}/${store_id}/products/${product_id}`,
      product,
    );
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.updateProduct');
  }
}

/**
 * Deletes a product from the store.
 *
 * @param {string} store_id - The ID of the store.
 * @param {string} product_id - The ID of the product to be deleted.
 * @returns {Promise<IdResponse | ErrorResponse | MessageResponse>} A promise resolving to the response data.
 */
export async function deleteProduct(
  store_id: string,
  product_id: string,
): Promise<IdResponse | ErrorResponse | MessageResponse> {
  try {
    const response: AxiosResponse = await axios.delete(
      `${storeURL}/${store_id}/products/${product_id}`,
    );
    return response.data;
  } catch (error) {
    return errorResponse(Error.toString(), 'api.store.deleteProduct');
  }
}
