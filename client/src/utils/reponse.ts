/**
 * Represents the structure of an API response.
 */
interface ApiResponse {
  /**
   * A string indicating the error type or code.
   */
  error: string;

  /**
   * A string representing the breakpoint or context of the error usually the func name.
   */
  breakPoint: string;

  /**
   * An optional message providing additional details about the error.
   */
  message?: string;
}

/**
 * Creates an API response object with error information.
 *
 * @param {string} error - A string indicating the error type or code.
 * @param {string} breakPoint - A string representing the breakpoint (func name) or context
 *                              of the error.
 * @param {string} [message] - An optional message providing additional details about the error.
 *
 * @returns {ApiResponse} An object representing the API response with error information.
 */
const errorResponse = (error: string, breakPoint: string, message?: string): ApiResponse => ({
  error,
  breakPoint,
  message,
});

export default errorResponse;
