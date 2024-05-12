import {UnauthorizedError} from "../errors/index.js";

const checkPermissions = (requestUser, type) => {
  if (requestUser.tipo === type) return;
  throw new UnauthorizedError("Não autorizado a acessar essa rota!");
};

export default checkPermissions;
