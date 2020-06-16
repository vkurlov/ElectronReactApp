export class CommonError extends Error {
  /**
   * Parameters for the error
   */
  public errorParams?: { [key: string]: any };

  /**
   * Type of the error
   */
  public errorType: string;

  /**
   * Code of the error
   */
  public errorCode?: string;

  /**
   * Additional errors
   */
  public errors?: { [key: string]: string };

  /**
   * Error for common usage
   * @param errorType - type for the error
   * @param message - Error message
   * @param errorParams - Parameters for the error
   * @param errorCode - Code for the error
   * @param errors - Additional errors
   */
  constructor(
    errorType: string,
    message: string,
    errorParams?: { [key: string]: string },
    errorCode?: string,
    errors?: { [key: string]: string }
  ) {
    super(message);
    this.errorParams = errorParams;
    this.errorType = errorType;
    this.errorCode = errorCode;
    this.errors = errors;
  }
}

export type ErrorObject = CommonError | Error;
