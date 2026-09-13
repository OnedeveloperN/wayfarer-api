const mongoose = require("mongoose");

const viajeSchema = new mongoose.Schema({
    conductor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true
    },
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    precioPorAsiento: {
        type: Number,
        required: true
    },
    asientosDisponibles: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ["activo", "completo", "cancelado", "finalizado"],
        default: "activo"
    }
}, {
    timestamps: true
});

const Viaje = mongoose.model("Viaje", viajeSchema);

module.exports = Viaje;