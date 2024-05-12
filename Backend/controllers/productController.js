import Product from "../models/Product.js";
import Movement from "../models/Movement.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";

const supplier = "fornecedor";
const client = "cliente";
const entry = "entrada";
const out = "saida";

const createProduct = async (req, res) => {
  checkPermissions(req.user, supplier);

  const { nome, descricao, preco, quantidade, tipo, vendedor } = req.body;

  if (!nome || !descricao || !preco || !quantidade || !tipo || !vendedor) {
    throw new BadRequestError("Forneça todos os campos obrigatórios!");
  }

  const productCreated = await Product.create(req.body);

  createMovement(productCreated, entry, quantidade, preco);

  res.status(StatusCodes.CREATED).json(productCreated);
};

const getProductById = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const getProducts = async (req, res) => {
  let result = Product.find();

  const products = await result;

  res.status(StatusCodes.OK).json({ products });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  if (req.user.tipo === client) {
    const { nome, descricao, preco, tipo, vendedor } = req.body;
    const {
      nome: existingNome,
      descricao: existingDescricao,
      preco: existingPreco,
      tipo: existingTipo,
      vendedor: existingVendedor,
    } = product;
    if (nome && nome !== existingNome) {
      throw new UnauthorizedError("Acesso negado!");
    }
    if (descricao && descricao !== existingDescricao) {
      throw new UnauthorizedError("Acesso negado!");
    }
    if (preco && preco !== existingPreco) {
      throw new UnauthorizedError("Acesso negado!");
    }
    if (tipo && tipo !== existingTipo) {
      throw new UnauthorizedError("Acesso negado!");
    }
    if (vendedor && vendedor !== existingVendedor) {
      throw new UnauthorizedError("Acesso negado!");
    }
  }

  const { quantidade: existingQuantity } = product;
  const { quantidade: updatedQuantity, preco } = req.body;

  if (updatedQuantity > existingQuantity) {
    checkPermissions(req.user, supplier);
    await createMovement(
      product,
      entry,
      updatedQuantity - existingQuantity,
      preco
    );
  } else {
    await createMovement(
      product,
      out,
      existingQuantity - updatedQuantity,
      preco
    );
  }

  const updatedProduct = await Product.findOneAndUpdate(
    { _id: productId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedProduct });
};

const deleteProduct = async (req, res) => {
  checkPermissions(req.user, supplier);

  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError(`No product with id: ${productId}`);
  }

  await product.deleteOne();

  res.status(StatusCodes.OK).json({ msg: "Success! Product removed!" });
};

const createMovement = async (product, type, quantity, price) => {
  const currentUTCDate = new Date();
  currentUTCDate.setUTCHours(currentUTCDate.getUTCHours() - 3);
  const utcTimestamp = currentUTCDate.getTime();

  const movimentationData = {
    produto: product._id,
    tipo: type,
    quantidade: quantity,
    preco: price,
    data: new Date(utcTimestamp),
  };

  await Movement.create(movimentationData);
};

export {
  createProduct,
  getProductById,
  getProducts,
  updateProduct,
  deleteProduct,
};
