import fs from 'fs';
import path from 'path';
import { Reservation } from '../domain/Reservation';
import { ReservationRepository } from '../domain/ReservationRepository';

interface ReservationRecord {
  id: string;
  customerName: string;
  reservationDate: string;
  status: 'PENDING' | 'CONFIRMED';
}

export class JsonReservationRepository implements ReservationRepository {
  private filePath = path.join(process.cwd(), 'reservations.json');

  async save(reservation: Reservation): Promise<void> {
    const reservations = this.readFile();

    reservations.push({
      id: reservation.id,
      customerName: reservation.customerName,
      reservationDate: reservation.reservationDate.toISOString(),
      status: reservation.status,
    });

    this.writeFile(reservations);
  }

  async findById(id: string): Promise<Reservation | null> {
    const reservations = this.readFile();
    const reservation = reservations.find(item => item.id === id);

    if (!reservation) return null;

    const domainReservation = Reservation.create(
      reservation.id,
      reservation.customerName,
      new Date(reservation.reservationDate)
    );

    if (reservation.status === 'CONFIRMED') {
      domainReservation.confirm();
    }

    return domainReservation;
  }

  async findAll(): Promise<Reservation[]> {
    const reservations = this.readFile();

    return reservations.map(item => {
      const reservation = Reservation.create(
        item.id,
        item.customerName,
        new Date(item.reservationDate)
      );

      if (item.status === 'CONFIRMED') {
        reservation.confirm();
      }

      return reservation;
    });
  }

  private readFile(): ReservationRecord[] {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify([]));
    }

    const data = fs.readFileSync(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  private writeFile(reservations: ReservationRecord[]): void {
    fs.writeFileSync(this.filePath, JSON.stringify(reservations, null, 2));
  }
}