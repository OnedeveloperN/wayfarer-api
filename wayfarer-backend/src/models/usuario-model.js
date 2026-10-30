const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    rol: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    },
    esConductor: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// Middleware Mongoose: Encriptar contraseña antes de guardar (Async / sin next)
usuarioSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar contraseñas en el login
usuarioSchema.methods.compararPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Excluir la contraseña al transformar a JSON
usuarioSchema.methods.toJSON = function () {
  const usuario = this.toObject();
  delete usuario.password;
  return usuario;
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;