const express = require("express");
const cors = require("cors");
const viajeRoutes = require("./routes/viaje.routes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");
require("./models/Usuario");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/debug", (req, res) => {
    res.json({
        mongoUriExiste: !!process.env.MONGODB_URI,
        mongoUriLongitud: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0,
        port: process.env.PORT || "no definido"
    });
});

const connectDB = require("./config/db");

app.use(async (req, res, next) => {
    try {
        await connectDB(process.env.MONGODB_URI);
        next();
    } catch (error) {
        res.status(500).json({ mensaje: "Error de conexión a la base de datos" });
    }
});

app.use("/api/viajes", viajeRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;