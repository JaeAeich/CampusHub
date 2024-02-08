import { ErrorResponse } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import errorResponse from "@/utils/response";
import { MessageResponse } from "../types";
import baseURL from "../config";
import Product from "./types";

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
        const response: AxiosResponse = await axios.get(`${productsURL}`, { params: { search_query: query } });
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
        const response: AxiosResponse = await axios.get(`${productsURL}`, { params: { search_query: query } });
        return response.data;
    } catch (error: unknown) {
        return errorResponse(error, 'api.products') as MessageResponse | ErrorResponse;
    }
}