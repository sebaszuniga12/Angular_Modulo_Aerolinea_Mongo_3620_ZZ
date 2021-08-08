import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  templateUrl: './server-booking-return.component.html',
  styleUrls: ['./server-booking-return.component.scss']
})
export class ServerBookingReturnComponent implements OnInit {

  reserva: any;
  clienteCollapsed: boolean = true;
  rutaCollapsed: boolean = true;
  vuelosCollapsed: boolean = true;
  boletosCollapsed: boolean = true;
  subtotalCollapsed: boolean = true;
  isCollapsed: boolean = true;
  animated: boolean = true;
  cargoExtra: number = 0;

  constructor(private router: Router, private builder: FormBuilder, private toastrService: ToastService) { }

  ngOnInit(): void {
    var jsonSerial: string = sessionStorage.getItem('reserva1') == null ? "{}" : String(sessionStorage.getItem('reserva1'));
    this.reserva = JSON.parse(jsonSerial);
    this.cargoExtra = parseFloat(sessionStorage.getItem("cargoExtra"));
    if (!Object.keys(this.reserva).length) {
      this.router.navigate(['/route']);
    }else{
      this.showSucces('Reserva Creada exitosamente');
    }
  }

  showSucces(message: string) {
    this.toastrService.success(message, undefined, {
      positionClass: 'md-toast-bottom-right'
    });
  }

  roundDecimal(total: any){
    return total.toFixed(2);
  }

}
