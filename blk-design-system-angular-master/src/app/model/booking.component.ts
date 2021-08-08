import { Tickets } from "./tickets.components";

export class Booking{
    tipoIdentificacion: String = "";
    identificacion: String = "";
    codigoRuta: number = 0;
    numeroBoletos: number = 0;
    fechaSalida: String = "";
    boletos: Array<Tickets> = new Array();
}
  