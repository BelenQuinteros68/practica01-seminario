import { CreateReservationUseCase } from "../use-cases/CreateReservationUseCase";
// import { JsonReservationRepository } from "./JsonReservationRepository";
import { MemoryReservationRepository } from "./MemoryReservationRepository";

// ADAPTADOR PRINCIPAL
// const reservationRepository = new JsonReservationRepository();
const reservationRepository = new MemoryReservationRepository();

// Crear el caso de uso con el repositorio elegido
export const createReservationUseCase =
  new CreateReservationUseCase(reservationRepository);