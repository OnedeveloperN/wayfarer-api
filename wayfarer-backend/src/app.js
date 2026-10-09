const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const viajeRoutes = require("./routes/viaje-routes");
const usuarioRoutes = require("./routes/usuario-routes");
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");
require("./models/usuario-model");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'))



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
app.use("/api/usuarios", usuarioRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
