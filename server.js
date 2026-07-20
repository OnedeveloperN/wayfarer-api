require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/config/db");

if (require.main === module) {
    const PORT = process.env.PORT || 4000;
    connectDB(process.env.MONGODB_URI)
        .then(() => {
            app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
        })
        .catch((err) => console.error("Error de conexión a MongoDB:", err.message));
}

module.exports = app;