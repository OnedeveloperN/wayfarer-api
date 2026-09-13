const Viaje = require("../models/Viaje");

// GET /api/viajes - obtener todos
const getViajes = async (req, res) => {
    try {
        const viajes = await Viaje.find().populate("conductor", "nombre email");
        res.status(200).json(viajes);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener los viajes", error: error.message });
    }
};

// GET /api/viajes/:id - obtener uno
const getViajeById = async (req, res) => {
    try {
        const viaje = await Viaje.findById(req.params.id);
        if (!viaje) {
            return res.status(404).json({ mensaje: "Viaje no encontrado" });
        }
        res.status(200).json(viaje);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al buscar el viaje", error: error.message });
    }
};

// POST /api/viajes - crear
const crearViaje = async (req, res) => {
    try {
        const nuevoViaje = await Viaje.create(req.body);
        res.status(201).json(nuevoViaje);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al crear el viaje", error: error.message });
    }
};

// PUT /api/viajes/:id - actualizar
// Solo el conductor que creó el viaje puede editarlo.
// Como no usamos JWT, el frontend nos dice "quién es" mediante el
// header x-usuario-id (ver aviso de seguridad: esto es autodeclarado,
// no verificado con un token firmado).
const actualizarViaje = async (req, res) => {
    try {
        const usuarioId = req.headers["x-usuario-id"];
        if (!usuarioId) {
            return res.status(401).json({ mensaje: "Falta identificar al usuario (x-usuario-id)" });
        }

        const viaje = await Viaje.findById(req.params.id);
        if (!viaje) {
            return res.status(404).json({ mensaje: "Viaje no encontrado" });
        }

        if (viaje.conductor.toString() !== usuarioId) {
            return res.status(403).json({ mensaje: "No podés editar un viaje que no es tuyo" });
        }

        const viajeActualizado = await Viaje.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json(viajeActualizado);

    } catch (error) {
        res.status(500).json({ mensaje: "Error al actualizar el viaje", error: error.message });
    }
};

// DELETE /api/viajes/:id - eliminar
// Misma verificación de propiedad que en actualizarViaje.
const eliminarViaje = async (req, res) => {
    try {
        const usuarioId = req.headers["x-usuario-id"];
        if (!usuarioId) {
            return res.status(401).json({ mensaje: "Falta identificar al usuario (x-usuario-id)" });
        }

        const viaje = await Viaje.findById(req.params.id);
        if (!viaje) {
            return res.status(404).json({ mensaje: "Viaje no encontrado" });
        }

        if (viaje.conductor.toString() !== usuarioId) {
            return res.status(403).json({ mensaje: "No podés eliminar un viaje que no es tuyo" });
        }

        const viajeEliminado = await Viaje.findByIdAndDelete(req.params.id);

        res.status(200).json({ mensaje: "Viaje eliminado correctamente", viaje: viajeEliminado });

    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar viaje", error: error.message });
    }
};

module.exports = { getViajes, getViajeById, crearViaje, actualizarViaje, eliminarViaje };
