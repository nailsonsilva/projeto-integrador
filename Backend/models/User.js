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
  email: {
    type: String,
    unique: true,
    required: [true, "Email é um campo obrigatório"],
    validate: {
      validator: validator.isEmail,
      message: "Forneça um email válido",
    },
  },
  senha: {
    type: String,
    required: [true, "Senha é um campo obrigatório"],
    minlength: 6,
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
