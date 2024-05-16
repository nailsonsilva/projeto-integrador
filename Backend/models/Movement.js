import mongoose from "mongoose";

const MovimentacaoSchema = new mongoose.Schema({
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Produto",
    required: [true, "Produto é um campo obrigatório"],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "Usuário é um campo obrigatório"],
  },
  quantidade: {
    type: Number,
    required: [true, "Quantidade é um campo obrigatório"],
    min: [0, "Quantidade deve ser no mínimo 0"],
  },
  data: {
    type: Date,
    required: [true, "Data é um campo obrigatório"],
  },
});

export default mongoose.model("Movimentacao", MovimentacaoSchema);
