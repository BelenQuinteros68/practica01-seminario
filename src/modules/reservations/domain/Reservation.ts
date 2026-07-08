export type ReservationStatus = 'PENDING' | 'CONFIRMED';

export interface ReservationProps {
  id: string;
  customerName: string;
  reservationDate: Date;
  status: ReservationStatus;
}

export class Reservation {
  private constructor(private props: ReservationProps) {}

  static create(
    id: string,
    customerName: string,
    reservationDate: Date
  ): Reservation {
    if (!customerName || customerName.trim().length < 3) {
      throw new Error('El nombre del cliente debe tener al menos 3 caracteres');
    }

    if (isNaN(reservationDate.getTime())) {
      throw new Error('La fecha de reserva no es válida');
    }

    const reservation = new Reservation({
      id,
      customerName,
      reservationDate,
      status: 'PENDING',
    });

    return reservation;
  }

  confirm(): void {
    this.validateReservationDate();
    this.props.status = 'CONFIRMED';
  }

  private validateReservationDate(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const requestedDate = new Date(this.props.reservationDate);
    requestedDate.setHours(0, 0, 0, 0);

    if (requestedDate < today) {
      throw new Error('No se puede confirmar una reserva con fecha anterior al día de hoy');
    }
  }

  get id(): string {
    return this.props.id;
  }

  get customerName(): string {
    return this.props.customerName;
  }

  get reservationDate(): Date {
    return this.props.reservationDate;
  }

  get status(): ReservationStatus {
    return this.props.status;
  }

  toJSON() {
    return {
      id: this.props.id,
      customerName: this.props.customerName,
      reservationDate: this.props.reservationDate,
      status: this.props.status,
    };
  }
}