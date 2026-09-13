const mongoose = require('mongoose');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);

const Usuario = require('./src/models/Usuario');

const uri = process.argv[2];

async function run() {
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB');

    const existente = await Usuario.findOne({ email: 'nico@wayfarer.test' });
    if (existente) {
        console.log('Ya existe, _id:', existente._id.toString());
        await mongoose.disconnect();
        return;
    }

    const usuario = await Usuario.create({
        nombre: 'Nico (usuario de prueba)',
        email: 'nico@wayfarer.test',
        password: 'password123',
        esConductor: true,
    });

    console.log('Usuario creado, _id:', usuario._id.toString());
    await mongoose.disconnect();
}

run().catch((err) => {
    console.error('Error:', err.message);
    process.exit(1);
});