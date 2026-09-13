const Usuario = require("../models/Usuario");

// GET /api/usuarios - listar todos (para el selector de "iniciar sesión")
// Nunca devolvemos la password, ni siquiera hasheada.
const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find().select("-password");
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los usuarios", error: error.message });
    }
};

// POST /api/usuarios - registrar uno nuevo
const crearUsuario = async (req, res) => {
    try {
        const { nombre, email, password, esConductor } = req.body;

        const existente = await Usuario.findOne({ email: email?.toLowerCase().trim() });
        if (existente) {
            return res.status(409).json({ mensaje: "Ya existe un usuario con ese email" });
        }

        const nuevoUsuario = await Usuario.create({ nombre, email, password, esConductor });

        // Igual que en getUsuarios, nunca devolvemos la password en la respuesta.
        const usuarioSinPassword = nuevoUsuario.toObject();
        delete usuarioSinPassword.password;

        res.status(201).json(usuarioSinPassword);
    } catch (error) {
        if (error.name === "ValidationError") {
            const mensajes = Object.values(error.errors).map((e) => e.message);
            return res.status(400).json({ mensaje: mensajes.join(", ") });
        }
        res.status(500).json({ mensaje: "Error al crear el usuario", error: error.message });
    }
};

module.exports = { getUsuarios, crearUsuario };
