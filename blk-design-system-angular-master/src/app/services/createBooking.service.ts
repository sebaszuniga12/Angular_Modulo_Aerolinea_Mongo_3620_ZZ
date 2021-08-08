import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Booking } from '../model/booking.component';

@Injectable({
  providedIn: 'root'
})
export class CreateBookingService {
    
  rootURL = '/v2';
  constructor(private http: HttpClient) { }

  getSeats(dateOfDeparture: String,codeRoute:String) {
    return this.http.get(this.rootURL + `/rutaReserva/${dateOfDeparture}/${codeRoute}`);
  }

  findPassenger(clientTypeIdentification:String,clientIdentification:String) {
    return this.http.get(this.rootURL + `/pasajero/par/${clientTypeIdentification}/${clientIdentification}`);
  }

  createPassenger(passenger: object): Observable<Object>{
    return this.http.post(`${this.rootURL}/pasajero`, passenger);
  }
  
  getCliente(clientTypeIdentification:String,clientIdentification:String) {
    return this.http.get(this.rootURL + `/cliente/par/${clientTypeIdentification}/${clientIdentification}`);
  }

  createClient(user: object): Observable<Object>{
    return this.http.post(`${this.rootURL}/cliente`, user);
  }

  saveBooking(booking: Booking): Observable<Object>{
    return this.http.post(`${this.rootURL}/reserva`,booking);
  }
}