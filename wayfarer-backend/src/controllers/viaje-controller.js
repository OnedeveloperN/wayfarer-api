const Viaje = require("../models/viaje-model");

// GET /api/viajes - obtener todos
const getViajes = async (req, res, next) => {
    try {
        const viajes = await Viaje.find().populate("conductor", "nombre email");
        res.status(200).json(viajes);
    } catch (error) {
        next(error);
    }
};

// GET /api/viajes/:id - obtener uno
const getViajeById = async (req, res, next) => {
    try {
        const viaje = await Viaje.findById(req.params.id);
        if (!viaje) {
            return res.status(404).json({ mensaje: "Viaje no encontrado" });
        }
        res.status(200).json(viaje);
    } catch (error) {
        next(error);
    }
};

// POST /api/viajes - crear
const crearViaje = async (req, res, next) => {
    try {
        const nuevoViaje = await Viaje.create(req.body);
        res.status(201).json(nuevoViaje);
    } catch (error) {
        next(error);
    }
};

// PUT /api/viajes/:id - actualizar
const actualizarViaje = async (req, res, next) => {
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
            { new: true, runValidators: true }
        );

        res.status(200).json(viajeActualizado);

    } catch (error) {
        next(error);
    }
};

// DELETE /api/viajes/:id - eliminar
const eliminarViaje = async (req, res, next) => {
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
        next(error);
    }
};

module.exports = { getViajes, getViajeById, crearViaje, actualizarViaje, eliminarViaje };