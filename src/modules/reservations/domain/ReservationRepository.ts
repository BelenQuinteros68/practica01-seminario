import { Reservation } from './Reservation';

export interface ReservationRepository {
  save(reservation: Reservation): Promise<void>;
  findById(id: string): Promise<Reservation | null>;
  findAll(): Promise<Reservation[]>;
}