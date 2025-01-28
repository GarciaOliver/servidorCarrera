//PROTOCOLO DE INTERCAMBIO
const express = require('express');
const app = express();
app.use(express.json());

let carrera = {
    estado: "No iniciada",
    participantes: [],
    ganador: null
};

app.all('/carrera', (req, res) => {
    switch (req.method) {
        case 'GET':
            res.status(200).json(carrera);
            break;

        case 'POST':
            // Iniciar la carrera
            if (carrera.estado === "No iniciada") {
                carrera.estado = "En progreso";
                carrera.participantes = req.body.participantes || [];
                res.status(201).json({ mensaje: "Carrera iniciada", carrera });
            } else {
                res.status(400).json({ mensaje: "La carrera ya ha comenzado" });
            }
            break;

        case 'PUT':
            // Actualizar el estado de la carrera
            if (carrera.estado === "En progreso") {
                carrera.estado = "Finalizada";
                carrera.ganador = req.body.ganador || null;
                res.status(200).json({ mensaje: "Carrera finalizada", carrera });
            } else {
                res.status(400).json({ mensaje: "La carrera no está en progreso" });
            }
            break;

        case 'DELETE':
            // Reiniciar la carrera
            carrera = {
                estado: "No iniciada",
                participantes: [],
                ganador: null
            };
            res.status(200).json({ mensaje: "Carrera reiniciada", carrera });
            break;

        default:
            res.status(405).json({ mensaje: "Método no permitido" });
    }
});

//llamada al puerto por defecto de node 3000
app.listen(3000, () => {
    console.log('Escuchando a través del puerto 3000')
});