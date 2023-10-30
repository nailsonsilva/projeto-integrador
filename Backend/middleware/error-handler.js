import { StatusCodes } from "http-status-codes";

// define um padrao para lidar com os errors
const errorHandlerMiddleware = (err, req, res, next) => {
  // error padrao
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Ops! Algo deu errado!",
  };

  // erro no caso de erros de validaçao
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCode = 400;
  }
  // erro no caso de casting
  if (err.name === "CastError") {
    customError.msg = `Nenhum item encontrado com o id: ${err.value}`;
    customError.statusCode = 404;
  }
  // erro para quando o usuario tenta criar uma entidade com uma propriedade unica que ja existe
  // por exemplo quando ja existe um usuario com o email cadastrado
  if (err.code && err.code === 11000) {
    customError.msg = `Valor duplicado entrado para: ${Object.keys(
      err.keyValue
    )} campo, escolha outro valor`;
    customError.statusCode = 400;
  }
  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
