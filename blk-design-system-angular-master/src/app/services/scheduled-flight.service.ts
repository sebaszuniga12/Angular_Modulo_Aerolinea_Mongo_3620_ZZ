import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScheduledFlightService {

  constructor(private http: HttpClient) { }

  rootURL = '/v2';

  getUbicacion(scheduledFlightCityOrigin: String,scheduledFlightCityDestination: String,monthOfDeparture:string) {
    return this.http.get(this.rootURL + `/ruta/ciudades/${scheduledFlightCityOrigin}/${scheduledFlightCityDestination}/${monthOfDeparture}`);
  }

}
