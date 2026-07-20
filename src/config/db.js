const mongoose = require("mongoose");

let cached = global._mongooseConn;

if (!cached) {
    cached = global._mongooseConn = { conn: null, promise: null };
}

async function connectDB(uri) {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(uri).then((mongooseInstance) => {
            console.log('Conexion exitosa a MongoDB');
            return mongooseInstance;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {
        cached.promise = null;
        console.error('Error al conectar con MongoDB:', error.message);
        throw error;
    }

    return cached.conn;
}

module.exports = connectDB;