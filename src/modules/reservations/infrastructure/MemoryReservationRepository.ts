import { Reservation } from '../domain/Reservation';
import { ReservationRepository } from '../domain/ReservationRepository';

export class MemoryReservationRepository implements ReservationRepository {
  private reservations: Reservation[] = [];

  async save(reservation: Reservation): Promise<void> {
    this.reservations.push(reservation);
  }

  async findById(id: string): Promise<Reservation | null> {
    return this.reservations.find(item => item.id === id) || null;
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservations;
  }
}