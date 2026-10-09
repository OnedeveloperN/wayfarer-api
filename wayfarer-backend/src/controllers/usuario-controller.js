const Usuario = require("../models/usuario-model");

const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find().select("-password");
        res.status(200).json(usuarios);
    } catch (error) {
        next(error);
    }
};

const crearUsuario = async (req, res, next) => {
    try {
        const { nombre, email, password, esConductor } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({ mensaje: "Nombre, email y contraseña son obligatorios" });
        }

        const emailFormateado = email.toLowerCase().trim();

        const existente = await Usuario.findOne({ email: emailFormateado });
        if (existente) {
            return res.status(409).json({ mensaje: "Ya existe un usuario con ese email" });
        }

        const nuevoUsuario = await Usuario.create({
            nombre: nombre.trim(),
            email: emailFormateado,
            password,
            esConductor: Boolean(esConductor)
        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        // Imprime el fallo real en la terminal de Node
        console.error("Error al crear usuario:", error);
        next(error);
    }
};

module.exports = { getUsuarios, crearUsuario };