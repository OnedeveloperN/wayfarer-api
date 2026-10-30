const Usuario = require("../models/usuario-model");
const jwt = require("jsonwebtoken");

// Si no está definida en el .env, usa la clave por defecto para evitar que rompa la app
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_wayfarer_dev';

const getUsuarios = async (req, res, next) => {
    try {
        const usuarios = await Usuario.find();
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
        console.error("Error al crear usuario en controlador:", error);
        next(error);
    }
};

const loginUsuario = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ mensaje: "Email y contraseña son obligatorios" });
        }

        const usuario = await Usuario.findOne({ email: email.toLowerCase().trim() });
        if (!usuario) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        const esValido = await usuario.compararPassword(password);
        if (!esValido) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        // Se utiliza la constante declarada al inicio
        const token = jwt.sign(
            { id: usuario._id, email: usuario.email, rol: usuario.rol },
            JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            mensaje: "Login exitoso",
            token,
            usuario: {
                _id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol,
                esConductor: usuario.esConductor
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { getUsuarios, crearUsuario, loginUsuario };