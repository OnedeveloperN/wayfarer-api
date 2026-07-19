const mongoose = require("mongoose");

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

const Usuario = mongoose.model("Usuario", usuarioSchema);

module.exports = Usuario;