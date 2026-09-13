const express = require("express");
const router = express.Router();
const { getUsuarios, crearUsuario } = require("../controllers/usuario.controller");

router.get("/", getUsuarios);
router.post("/", crearUsuario);

module.exports = router;
