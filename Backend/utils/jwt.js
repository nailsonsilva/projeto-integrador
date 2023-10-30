import jwt from "jsonwebtoken";

// cria o token jwt
const createJWT = ({ payload }) => {
  // payload - dados que serão armazenados no token, JWT_SECRET - chave de assinatura do token
  // JWT_LIFETIME - tempo de expiraçao do token
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
  return token;
};

// checa se o token é valido: recebe o token e compara a assinatura,
// se for valido retorna true, caso contrario, retorna false
const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

// anexa o token nas respostas
const attachCookiesToResponse = ({ res, user }) => {
  const token = createJWT({ payload: user });
  const oneDay = 1000 * 60 * 60 * 24; // milissegundos para formar 1 dia

  res.cookie("token", token, {
    // anexa o token na propriedade 'token'
    httpOnly: true, // acessivel apenas pelo server http, prevenindo ataques XSS
    expires: new Date(Date.now() + oneDay), // define o tempo de expiraçao do cookie
    secure: process.env.NODE_ENV === "production", // se o ambiente for de produçao, o cookie so pode
    // ser enviado atraves de HTTPS, prevenindo ataques de 'eavesdropping'
    signed: true, // define que o cookie sera assinado, prevenindo 'cookie tampering'
  });
};

export { createJWT, isTokenValid, attachCookiesToResponse };
