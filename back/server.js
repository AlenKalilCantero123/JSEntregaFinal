const express = require('express');
const app = express();
const port = 3000;

// Datos de ejemplo
const packs = [
    { name: "Pack A", price: 100 },
    { name: "Pack B", price: 150 }
];

// Middleware para parsear JSON
app.use(express.json());

// Ruta para obtener packs
app.get('/api/packs', (req, res) => {
    res.json(packs);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
