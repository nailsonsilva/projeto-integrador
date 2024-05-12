// cria um token com o nome do usuario e o seu id
const createTokenUser = (user) => {
  return {
    nome: user.nome,
    userId: user._id,
    tipo: user.tipo
  };
};

export default createTokenUser;
