//PROTOCOLO DE INTERCAMBIO
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors({ origin: '*' }));
app.use(express.json());


app.all('/carrera', (req, res) => {
    const body=req.body;
    let distancia=parseInt(body.distancia);
    let corredores=parseInt(body.corredores);

    if (isNaN(distancia) || isNaN(corredores) || distancia < 100 || distancia > 400 || corredores <= 1) {
        return res.status(400).send('Por favor, ingrese valores válidos para la distancia y el número de corredores.');
    }
    
    let corredoresData = [];
    for (let i = 1; i <= corredores; i++) {
        let velocidad = Math.random() * (40 - 25) + 25; // Velocidad
        corredoresData.push({ id: i, velocidad: velocidad, posicion: 0 });
    }

    let tiempo = 0;
    let carrera = true;
    let historial = [];
    let ganador = null;

    while (carrera) {
        let estadoActual = { tiempo: tiempo, posiciones: [] };

        for (let i = 0; i < corredoresData.length; i++) { //Datos de la carrera y ganador
            corredoresData[i].posicion += corredoresData[i].velocidad;
            if (corredoresData[i].posicion >= distancia) {
                carrera = false;

                ganador = corredoresData[0];
                for (let i = 1; i < corredoresData.length; i++) {
                    if (corredoresData[i].velocidad > ganador.velocidad) {
                        ganador = corredoresData[i];
                    }
                }
            }
            estadoActual.posiciones.push({ id: corredoresData[i].id, posicion: corredoresData[i].posicion.toFixed(2) }); //Transforma a 2 decimales
        }
        tiempo++;
        historial.push({ estadoActual });
    }

    res.json({
        mensaje: 'Simulación de la carrera completada.',
        distancia: distancia,
        corredores: corredores,
        historial: historial,
        ganador: {
            id: ganador.id,
            posicion: ganador.posicion.toFixed(2),
            velocidad: ganador.velocidad.toFixed(2)
        }
    });
});

//llamada al puerto por defecto de node 3000
app.listen(3000, () => {
    console.log('Escuchando a través del puerto 3000')
});