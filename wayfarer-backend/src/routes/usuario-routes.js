const express = require("express");
const router = express.Router();
const { getUsuarios, crearUsuario, loginUsuario } = require("../controllers/usuario-controller");

// GET /api/usuarios - Listar usuarios
router.get("/", getUsuarios);

// POST /api/usuarios/register - Registro de nuevo usuario
router.post("/register", crearUsuario);

// POST /api/usuarios/login - Inicio de sesión
router.post("/login", loginUsuario);

module.exports = router;