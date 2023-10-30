import { UnauthorizedError } from "../errors";

// checa se o usuario tem as permissoes para modificar o recurso
const checkPermissions = (requestUser, resourceUserId) => {
  // checa se o userId é igual o userId do recurso acessado, se for igual,
  // significa que o usuario é o dono do recurso, retornando
  if (requestUser.userId === resourceUserId.toString()) return;
  // se nao for autorizado, retorna erro
  throw new UnauthorizedError("Não autorizado a access essa rota!");
};

export default checkPermissions;
