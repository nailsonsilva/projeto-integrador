import { UnauthenticatedError } from "../errors/index.js";
import { isTokenValid } from "../utils/index.js";

// autentica o usuario a partir do token recebido pelos cookies
const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token; // recebe o token pelos cookies
  if (!token) {
    // se nao tiver nenhum token, retorna erro
    throw new UnauthenticatedError("Autenticação inválida!");
  }

  try {
    const payload = isTokenValid({ token }); // checa se o token é valido e retorna o conteudo do token
    const { nome, userId } = payload.payload;
    req.user = { nome, userId }; // adiciona o user a requisiçao
    next(); // retorna, passando a requisiçao com o usuario para as funçoes posteriores
  } catch (error) {
    // se o token não for válido, retorna erro
    throw new UnauthenticatedError("Autenticação inválida!");
  }
};

export { authenticateUser };
