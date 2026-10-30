const jwt = require("jsonwebtoken");

/**
 * Middleware para verificar la validez del token JWT en peticiones protegidas.
 */
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ mensaje: "Acceso denegado. Token no proporcionado o formato inválido." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        req.usuario = decodificado; // Asigna { id, email, rol } a la petición
        next();
    } catch (error) {
        return res.status(401).json({ mensaje: "Token inválido o expirado." });
    }
};

module.exports = { verificarToken };