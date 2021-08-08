import { TicketMap } from "./ticketsMap.components";

export class BookingReview{
    cliente: any;
    pasajeros: Array<any> = new Array();
    boletos: Array<any> = new Array();
    ruta: any;
    vuelos: Array<any> = new Array();
    fechaSalida: String = "";
    ticketMap: Array<TicketMap> = new Array();
}