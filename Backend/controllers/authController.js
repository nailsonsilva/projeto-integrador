import User from "../models/User.js";
import { attachCookiesToResponse, createTokenUser } from "../utils/index.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
} from "../errors/index.js";

const register = async (req, res) => {
  const { nome, email, senha } = req.body; // recebe as propriedades do corpo da requisiçao

  if (!nome || !email || !senha) {
    // se alguma propriedade esta faltando, retorna um erro
    throw new BadRequestError("Forneça todos os campos obrigatórios!");
  }

  const user = await User.create({ nome, email, senha }); // cria a entidade no banco de dados

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) {
    throw new BadRequestError("Forneça todos os campos obrigatórios!");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFoundError("Credenciais inválidas!");
  }

  const isPasswordCorrect = await user.comparePassword(senha);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Credenciais inválidas!");
  }

  const tokenUser = createTokenUser(user);

  attachCookiesToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "Sucesso! Usuário deslogado!" });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId })
    .select("-senha")
    .select("-_id");
  res.status(StatusCodes.OK).json({ user });
};

export { register, login, logout, getCurrentUser };
