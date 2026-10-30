require("dotenv").config();
const mongoose = require("mongoose");
const Usuario = require("./src/models/usuario-model");

async function run() {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB");

    // Limpiar usuarios previos si existen
    await Usuario.deleteMany({ email: { $in: ["admin@wayfarer.test", "user1@wayfarer.test", "user2@wayfarer.test"] } });

    // 1. Administrador
    const admin = await Usuario.create({
        nombre: "Administrador General",
        email: "admin@wayfarer.test",
        password: "Admin123456!",
        rol: "admin",
        esConductor: true
    });

    // 2. Usuario 1
    const user1 = await Usuario.create({
        nombre: "Juan Pérez",
        email: "user1@wayfarer.test",
        password: "User123456!",
        rol: "user",
        esConductor: true
    });

    // 3. Usuario 2
    const user2 = await Usuario.create({
        nombre: "María García",
        email: "user2@wayfarer.test",
        password: "User123456!",
        rol: "user",
        esConductor: false
    });

    console.log("✅ 3 Usuarios de prueba creados exitosamente:");
    console.log("1. Admin:", admin.email, "(Password: Admin123456!)");
    console.log("2. User 1:", user1.email, "(Password: User123456!)");
    console.log("3. User 2:", user2.email, "(Password: User123456!)");

    await mongoose.disconnect();
}

run().catch((err) => {
    console.error("Error al ejecutar seed:", err);
    process.exit(1);
});