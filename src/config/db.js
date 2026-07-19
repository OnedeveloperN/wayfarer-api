const mongoose = require("mongoose");

async function connectDB(uri) {
    try {
        await mongoose.connect(uri);
        console.log('Conexion exitosa a MongoDB');
    } catch(error) {
        console.error('Error al conectar con MongoDB:', error.message);
        process.exit(1);
    }
}

module.exports = connectDB;