import express from 'express';
import { ReservationController } from './modules/reservations/infrastructure/ReservationController';

const app = express();
const port = 3000;

app.use(express.json());

const reservationController = new ReservationController();

app.get('/reservations', (req, res) => {
  res.json({
    message: 'Ruta funcionando. Para crear una reserva usa POST /reservations'
  });
});

app.post('/reservations', (req, res) => {
  reservationController.create(req, res);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

