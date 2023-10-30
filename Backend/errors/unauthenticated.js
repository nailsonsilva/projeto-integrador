import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api.js";

// erros relacionados a autenticaçao
class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
