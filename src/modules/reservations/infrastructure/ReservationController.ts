import { Request, Response } from 'express';
import { createReservationUseCase } from './reservationDependencies';

export class ReservationController {
  async create(req: Request, res: Response) {
    try {
      const result = await createReservationUseCase.execute({
        customerName: req.body.customerName,
        reservationDate: req.body.reservationDate,
      });

      return res.status(201).json({
        message: 'Reserva creada correctamente',
        data: result,
      });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}