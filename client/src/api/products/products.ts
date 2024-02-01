import { ErrorResponse } from "react-router-dom";
import { MessageResponse } from "../types";
import axios, { AxiosResponse } from "axios";
import baseURL from "../config";
import errorResponse from "@/utils/response";
import Product from "./types";

/**
 * Represents the base URL for the services API.
 */
const productsURL = `${baseURL}/products`;

export async function getProductsByQuery(
    query: string,
): Promise<{ products: Product[] } | MessageResponse | ErrorResponse> {
    try {
        const response: AxiosResponse = await axios.get(`${productsURL}`, { params: { search_query: query } });
        return response.data;
    } catch (error: unknown) {
        return errorResponse(error, 'api.products') as MessageResponse | ErrorResponse;
    }
}
