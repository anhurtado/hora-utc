const express = require('express');

// Configuración
const app = express();
app.use(express.json());

// Ruta UTC
app.post('/', function (req, res) {
  const { time, timezone } = req.body;

  // Convirtiendo la hora
  const timeConvert = convertTime(time, timezone);

  // Respuesta
  res.status(200).json({
    response: {
      time: timeConvert,
      timezone: `utc${ timezone }`
    }
  });
});

function convertTime(time, timezone) {
  // Variables
  const operator = timezone.substr(0, 1);
  const tz = Math.abs(timezone);
  const timeSplit = time.split(':');

  // Operación
  if (operator === '+') {
    hour = Number.parseInt(timeSplit[0], 10) - tz;
  } else {
    hour = Number.parseInt(timeSplit[0], 10) + tz;
  }
  hour = Math.abs(hour);

  // Obtener la fecha UTC
  return `${ hour }:${ timeSplit[1] }:${ timeSplit[2] }`;
}

// Corriendo el servidor
const port = 3000;
app.listen(port, () => console.log(`Ejecutando en el puerto ${ port }`));
