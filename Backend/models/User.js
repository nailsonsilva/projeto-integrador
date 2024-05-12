import mongoose from "mongoose"; // biblioteca do mongodb
import validator from "validator"; // biblioteca para criar validacoes no modelo
import bcrypt from "bcryptjs"; // biblioteca para criptografar a senha

// cria o esqueleto da entidade com as propriedades e validaçoes
const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, "Nome é um campo obrigatório"],
    minlength: 3,
    maxlength: 50,
  },
  documento: {
    type: String,
    minlength: 11,
  },
  senha: {
    type: String,
    required: [true, "Senha é um campo obrigatório"],
    minlength: 6,
  },
  tipo: {
    type: String,
    enum: ["fornecedor", "cliente"],
    required: [true, "Tipo é um campo obrigatório"],
  },
});

// criptografa a senha sempre que uma entidade for salva
UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.senha = await bcrypt.hash(this.senha, salt);
});

// compara se a senha nao criptografa corresponde a senha criptografada salva no bd
UserSchema.methods.comparePassword = async function (rawPassword) {
  const isMatch = await bcrypt.compare(rawPassword, this.senha);
  return isMatch;
};

export default mongoose.model("User", UserSchema);
