/**
 * Represents the structure of an API response.
 */
export interface ErrorResponse {
  /**
   * A string indicating the error type or code.
   */
  error: string;

  /**
   * A string representing the breakpoint or context of the error, usually the func name.
   */
  breakPoint: string;

  /**
   * An optional message providing additional details about the error.
   */
  message?: string;

  /**
   * An optional stack trace of the error.
   */
  stack?: string;
}

/**
 * Creates an API response object with error information.
 *
 * @param {Error | unknown} error - The error object.
 * @param {string} breakPoint - A string representing the breakpoint (func name) or context
 *                              of the error.
 * @returns {ErrorResponse} An object representing the API response with error information.
 */
const errorResponse = (error: Error | unknown, breakPoint: string): ErrorResponse => {
  const errorName = error instanceof Error ? error.name : 'UnknownError';
  const errorMessage = error instanceof Error ? error.message : JSON.stringify(error);
  const errorStack = error instanceof Error ? error.stack : undefined;

  return {
    error: errorName,
    breakPoint,
    message: errorMessage,
    stack: errorStack,
  };
};

export default errorResponse;
