const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'El email no tiene un formato válido']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    esConductor: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Antes de guardar, si la password fue modificada (o es nueva), la hasheamos.
// Así nunca queda guardada en texto plano en la base de datos, aunque
// en este proyecto no la usemos para verificar login (elegiste el modo
// "seleccionar usuario sin contraseña").
usuarioSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;