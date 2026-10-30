/**
 * Servidor Express Principal - API Wayfarer
 * Este archivo configura los middlewares globales, la conexión a la base de datos,
 * la seguridad HTTP y las rutas de la API REST.
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet"); // Protección y seguridad de cabeceras HTTP

// Importación de rutas
const viajeRoutes = require("./routes/viaje-routes");
const usuarioRoutes = require("./routes/usuario-routes");

// Importación de middlewares personalizados
const notFound = require("./middlewares/not-found");
const errorHandler = require("./middlewares/error-handler");

// Carga explícita del modelo de Usuario para evitar errores de compilación en Mongoose (MissingSchemaError)
require("./models/usuario-model");

// Inicialización de la aplicación Express
const app = express();

// ==========================================
// MIDDLEWARES GLOBALES Y SEGURIDAD
// ==========================================

// Helmet aplica cabeceras de seguridad HTTP por defecto para mitigar vulnerabilidades comunes
app.use(helmet());

// Parseo de cuerpos JSON en las peticiones entrantes
app.use(express.json());

// Habilitación de CORS para permitir peticiones desde el frontend en Vercel
app.use(cors());

// Registro y logging de peticiones HTTP en consola durante desarrollo
app.use(morgan("dev"));

// Configuración de la conexión a MongoDB Atlas
const connectDB = require("./config/db");

/**
 * Middleware para asegurar la conexión a la base de datos antes de procesar cualquier ruta.
 * Utiliza la variable de entorno MONGODB_URI definida en el archivo .env / Vercel.
 */
app.use(async (req, res, next) => {
    try {
        await connectDB(process.env.MONGODB_URI);
        next();
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error.message);
        res.status(500).json({ mensaje: "Error de conexión a la base de datos" });
    }
});

// ==========================================
// RUTAS DE LA API REST
// ==========================================

// Rutas asociadas a la gestión de viajes
app.use("/api/viajes", viajeRoutes);

// Rutas asociadas a la autenticación y gestión de usuarios
app.use("/api/usuarios", usuarioRoutes);

// ==========================================
// MANEJO DE ERRORES Y RUTAS NO ENCONTRADAS
// ==========================================

// Captura de rutas inexistentes (404)
app.use(notFound);

// Middleware centralizado para el manejo de errores del servidor (500)
app.use(errorHandler);

module.exports = app;