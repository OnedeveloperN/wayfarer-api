const express = require("express");
const router = express.Router();
const {
    getViajes,
    getViajeById,
    crearViaje,
    actualizarViaje,
    eliminarViaje
} = require("../controllers/viaje.controller");

router.get("/", getViajes);
router.get("/:id", getViajeById);
router.post("/", crearViaje);
router.put("/:id", actualizarViaje);
router.delete("/:id", eliminarViaje);

module.exports = router;