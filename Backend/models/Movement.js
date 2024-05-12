import mongoose from "mongoose";

const MovimentacaoSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto",
    required: [true, "Produto é um campo obrigatório"],
  },
  tipo: {
    type: String,
    required: [true, "Tipo é um campo obrigatório"],
    enum: ["entrada", "saida"],
  },
  quantidade: {
    type: Number,
    required: [true, "Quantidade é um campo obrigatório"],
    min: [1, "Quantidade deve ser no mínimo 1"],
  },
  preco: {
    type: Number,
    required: [true, "Preço é um campo obrigatório"],
    min: [0.01, "Preço deve ser no mínimo R$ 0,01"],
  },
  data: {
    type: Date,
    required: [true, "Data é um campo obrigatório"],
  },
});

export default mongoose.model("Movimentacao", MovimentacaoSchema);
