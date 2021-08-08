import { Tickets } from "./tickets.components";

export class Booking{
    codigoCliente: number = 0;
    codigoRuta: number = 0;
    numeroBoletos: number = 0;
    fechaSalida: String = "";
    boletos: Array<Tickets> = new Array();
}
  