import { randomUUID } from 'crypto';
import { Reservation } from '../domain/Reservation';
import { ReservationRepository } from '../domain/ReservationRepository';

interface CreateReservationDTO {
  customerName: string;
  reservationDate: string;
}

export class CreateReservationUseCase {
  constructor(private reservationRepository: ReservationRepository) {}

  async execute(data: CreateReservationDTO) {
    const id = randomUUID();

    const reservation = Reservation.create(
      id,
      data.customerName,
      new Date(data.reservationDate)
    );

    reservation.confirm();

    await this.reservationRepository.save(reservation);

    return reservation.toJSON();
  }
}