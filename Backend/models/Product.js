import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é um campo obrigatório"],
    minlength: [3, "Nome deve ter no mínimo 3 caracteres"],
    maxlength: [50, "Nome deve ter no máximo 50 caracteres"],
  },
  descricao: {
    type: String,
    required: [true, "Descrição é um campo obrigatório"],
  },
  tipo: {
    type: String,
    required: [true, "Tipo é um campo obrigatório"],
  },
  vendedor: {
    type: String,
    required: [true, "Vendedor é um campo obrigatório"],
  },
  imagem: {
    type: String,
  },
  preco: {
    type: Number,
    required: [true, "Preço é um campo obrigatório"],
    min: [0.01, "Preço deve ser no mínimo R$ 0,01"],
  },
  quantidade: {
    type: Number,
    required: [true, "Quantidade é um campo obrigatório"],
    min: [0, "Quantidade deve ser no mínimo 0"],
  },
});

export default mongoose.model("Produto", ProductSchema);
