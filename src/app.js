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

app.use("/api/viajes", viajeRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;