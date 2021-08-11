import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateBookingService } from '../../../services/createBooking.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  templateUrl: './review-booking.component.html'
})
export class ReviewBookingComponent implements OnInit {

  isCollapsed = true;
  animated: boolean = true;
  reserva: any;
  reservaReview: any;
  clienteCollapsed: boolean = true;
  rutaCollapsed: boolean = true;
  vuelosCollapsed: boolean = true;
  boletosCollapsed: boolean = true;
  subtotalCollapsed: boolean = true;
  cargoExtraVal: number = 0;

  constructor(private router: Router, private bookingService: CreateBookingService, private builder: FormBuilder, private toastrService: ToastService) { }

  ngOnInit(): void {
    var jsonSerial: string = sessionStorage.getItem('reserva') == null ? "{}" : String(sessionStorage.getItem('reserva'));
    var jsonSerial2: string = sessionStorage.getItem('reservaReview') == null ? "{}" : String(sessionStorage.getItem('reservaReview'));
    this.reserva = JSON.parse(jsonSerial);
    this.reservaReview = JSON.parse(jsonSerial2);
    if (!Object.keys(this.reserva).length) {
      this.router.navigate(['/route']);
    }
    console.log(this.reservaReview);
    //console.log(this.reservaReview.pasajeros.find(i=>i.codigo=4))
  }

  public getPassengerInfo(identificacion: string, tipoIdentificacion: string): any {
    for(var i=0;i<this.reservaReview.pasajeros.length;i++){
      if(this.reservaReview.pasajeros[i].tipoIdentificacion == tipoIdentificacion && this.reservaReview.pasajeros[i].identificacion == identificacion){
        return this.reservaReview.pasajeros[i];
      }
    }
  }

  public getVueloInfo(codAeroOrg: string, codAeroDest: string): any {
    for(var i=0;i<this.reservaReview.vuelos.vuelo.length;i++){
      if(this.reservaReview.vuelos.vuelo[i].aeropuertoOrigen.codigo == codAeroOrg && this.reservaReview.vuelos.vuelo[i].aeropuertoDestino.codigo == codAeroDest){
        return this.reservaReview.vuelos.vuelo[i];
      }
    }
  }

  public getAsientoInfo(codAeroOrg: string, codAeroDest: string, asientoNumber: number): any {
    let vuelo = this.getVueloInfo(codAeroOrg,codAeroDest);
    for(var i=0;i<vuelo.avion.asientos.length;i++){
      if(vuelo.avion.asientos[i].numeroAsiento == asientoNumber){
        return vuelo.avion.asientos[i];
      }
    }
  }

  public getClassCharge(): number {
    let acum = 0;
    this.reservaReview.boletos.forEach(boleto => {
      this.reservaReview.vuelos.vuelo.forEach(vuelo => {
        let asiento = vuelo.avion.asientos.find(i => i.codigo === boleto.codigoAsiento);
        if (asiento != undefined) {
          acum += asiento.cargoExtra;
          return;
        }
      });
    });
    this.cargoExtraVal = acum;
    return acum;
  }

  public reservar() {
    this.showInfo('Se está procesando la reserva')
    console.log(this.reserva);
    this.bookingService.saveBooking(this.reserva).subscribe(data => {
      sessionStorage.clear();
      sessionStorage.setItem("reserva1", JSON.stringify(data));
      sessionStorage.setItem("cargoExtra", this.cargoExtraVal.toString());
      console.log(data);
      this.router.navigate(['/savedReview']);
    }, error => {
      console.log(error);
      this.showError(error.error.exceptionMessage)
    });
  }
  showInfo(message: string) {
    this.toastrService.info(message, undefined, {
      positionClass: 'md-toast-bottom-right'
    });
  }
  showError(message: string) {
    this.toastrService.error(message, undefined, {
      positionClass: 'md-toast-bottom-right'
    });
  }
}
