import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CreateBookingService } from '../../services/createBooking.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Passenger } from '../../model/passenger.component';
import { Client } from '../../model/client.component';
import { Booking } from 'src/app/model/booking.component';
import { TicketMap } from 'src/app/model/ticketsMap.components';
import { Tickets } from 'src/app/model/tickets.components';
import { BookingReview } from 'src/app/model/bookingReview.component';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-createBooking',
  templateUrl: './createbookingpage.component.html'
})
export class CreateBookingComponent implements OnInit {
  cardCollapsed: boolean = true;
  animate: boolean = true;
  actualTicket: number = 0;
  reviewBooking: boolean = false;
  showClient: boolean = false;
  showCreateClient: boolean = false;
  showFindClient: boolean = false;
  showNoRUC: boolean = false;
  showRUC: boolean = false;
  showClientSelect: boolean = false;
  clientSearch: any;
  showClientFindRuc : boolean = false;
  showClientFindSelectRuc : boolean = false;
  showClientFindSelectNoRuc : boolean = false;
  client: Client = new Client();
  isCollapsed = true;
  passengerNew: Passenger = new Passenger();
  submitted = false;
  show: boolean = false;
  showClientFindNoRuc : boolean = false;
  numberTickets: number;
  ruta: any;
  reservaReview: any;
  seat: any;
  passenger: any[] = [];
  passengerOpt: any;
  passengerinfo: Array<any> = [];
  showFindPassenger: boolean = false;
  showReserve: boolean = false;
  dateOfDeparture: String;
  passengerTypeIdentification: String;
  showPassenger: boolean = false;
  showPassengerInfo: boolean = false;
  passengerIdentification: String;
  showCreatePassenger: boolean = false;
  ticketMap: Array<TicketMap> = new Array();
  currentDate: Date = new Date();
  reactiveForm: FormGroup;
  onlyletters = "[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1][a-zA-Z ]*$";
  emailvalidate = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";
  onlynumbers = "[0-9]*";


  constructor(private router: Router, private bookingService: CreateBookingService, private builder: FormBuilder,private toastrService: ToastService) { }

  ngOnInit() {
    var jsonSerial: string = sessionStorage.getItem('ruta') == null ? "{}" : String(sessionStorage.getItem('ruta'));
    this.ruta = JSON.parse(jsonSerial);
    if (!Object.keys(this.ruta).length) {
      this.router.navigate(['/route']);
    }
    this.reactiveForm = this.builder.group({
      boletos: [null, Validators.required]
    });
    this.dateOfDeparture = sessionStorage.getItem('fechaSalida');
    this.restoreSession();
  }

  restoreSession() {
    var jsonSerial: string = sessionStorage.getItem('reservaReview') == null ? "{}" : String(sessionStorage.getItem('reservaReview'));
    this.reservaReview = JSON.parse(jsonSerial);
    console.log(this.reservaReview);
    if (Object.keys(this.reservaReview).length) {
      this.numberTickets = this.reservaReview.pasajeros.length;
      this.dateOfDeparture = this.reservaReview.fechaSalida;
      this.showFindPassenger = true;
      this.passengerinfo = this.reservaReview.pasajeros;
      this.showPassengerInfo = true;
      this.showReserve = true;
      this.clientSearch = this.reservaReview.cliente;
      this.showClientSelect = true;
      this.seat = this.reservaReview.vuelos;
      this.show = true;
      //this.ticketMap = this.reservaReview.ticketMap;
      this.reviewBooking = true;
    }
  }

  isChecked(j, i) {
    console.log("Entra en esta función ");
    
  }

  save() {
    let flag = this.checkPassengerSize();
    if (flag) {
      this.bookingService.createPassenger(this.passengerNew).subscribe(data => {
        this.passengerinfo.push(data);
        this.showCreatePassenger = false;
        this.showPassengerInfo = true;
        this.checkPassengerMax();
        this.showCreatePassengerBox();
      }, error => this.showErrorSamePassenger());
    } else {
      this.showErrorNoMorePassangers();
    }

  }
  selectClient(tipoIdentificacion:String){
  this.showClientSelect = true;
  if(tipoIdentificacion == "RUC"){
    this.showClientFindSelectRuc = true;
    this.showClientFindSelectNoRuc = false;
  }
  else{
    this.showClientFindSelectNoRuc = true;
    this.showClientFindSelectRuc = false;
  }

  }

  private checkPassengerSize(): boolean {
    if (this.passengerinfo.length < this.numberTickets) {
      return true;
    } else {
      return false;
    }
  }

  private checkPassengerMax(): void {
    if (this.passengerinfo.length == this.numberTickets) {
      this.showReserve = true;
    } else {
      this.showReserve = false;
    }
  }

  public searchClientByIdentification(clientTypeIdentification: String, clientIdentification: String) {
    this.showClient = true;
    this.changeFieldsFind(clientTypeIdentification);
    this.bookingService.getCliente(clientTypeIdentification, clientIdentification).subscribe(
      (clientSearch: any) => {
        console.log(clientSearch);
        this.clientSearch = clientSearch;
      }, error => this.showNoClientFind()
    );
  }

  public find(numberTickets: number, dateOfDeparture: String) {
    this.showFindPassenger = true;
    this.numberTickets = numberTickets;
    this.dateOfDeparture = dateOfDeparture;
  }

  public getSeats() {
    this.bookingService.getSeats(this.dateOfDeparture, this.ruta.codigo).subscribe(
      (seat: any) => {
        this.show = true;
        this.seat = seat;
      }
    );
  }

  public searchPassengerByIdentification(passengerTypeIdentification: String, passengerIdentification: String) {
    this.bookingService.findPassenger(passengerTypeIdentification, passengerIdentification).subscribe(
      (passenger: any) => {
        this.showPassenger = true;
        this.passenger = passenger;
      }, error => this.showNoPassengerFind()
    );
  }

  public obtainPassengerInformation(passenger: any): void {
    let flag = this.checkPassengerSize();
    if (flag) {
      this.showPassengerInfo = true;
      this.showPassenger = false;
      this.passengerinfo.push(passenger);
      this.checkPassengerMax();
    } else {
      this.showPassenger = false;
      this.showErrorNoMorePassangers();
    }
  }


  availableCreate() {
    this.showCreatePassenger = true;
    this.reactiveForm = this.builder.group({
      identificacion: [null, Validators.required],
      tipoIdentificacion: [null, Validators.required],
      apellido: [null, Validators.required],
      nombre: [null, Validators.required],
      fechaDeNacimiento: [null, Validators.required]
    });
  }
  getAsientos() {
    this.reactiveForm = this.builder.group({
      identificacion: [null, Validators.required],
      tipoIdentificacion: [null, Validators.required]
    });
    this.show = true;
  }

  closeCreatePassenger() {
    this.showCreatePassenger = false;
  }

  deletePassenger(identificacion: any) {
    for (var i = 0; i <= this.passengerinfo.length; i++) {
      if (this.passengerinfo[i].identificacion == identificacion)
        this.passengerinfo.splice(i);
    }
  }


  showFindClientView() {
    this.showFindClient = true;
    this.showCreateClient = false;
  }

  showCreateClientView() {
    this.showFindClient = false;
    this.showCreateClient = true;
    this.reactiveForm = this.builder.group({
      identificacion: [null, Validators.required],
      tipoIdentificacion: [null, Validators.required],
      apellido: [null, Validators.required],
      nombre: [null, Validators.required],
      direccion: [null, Validators.required],
      telefono: [null, Validators.required],
      razonSocial: [null, Validators.required],
      email: [null, Validators.required]
    });
  }

  createClient() {
    this.bookingService.createClient(this.client).subscribe(data => {
      this.clientSearch = data;
      console.log(data);
      this.showCreateClientBox();
    }, error => this.showErrorSameClient());
    this.clientSearch = this.client;
    this.showClientSelect = true;
      if(this.clientSearch.tipoIdentificacion == "RUC"){
        this.showClientFindSelectRuc = true;
        this.showClientFindSelectNoRuc = false;
      }
      else{
        this.showClientFindSelectNoRuc = true;
        this.showClientFindSelectRuc = false;
      }
    this.client = new Client();
  }


  changeFields(identificacion: String) {
    if (identificacion == "RUC") {
      this.showNoRUC = false;
      this.showRUC = true;
    }
    else {
      this.showNoRUC = true;
      this.showRUC = false;
    }
  }

  private changeFieldsFind(identificacion: String) {
    if (identificacion == "RUC") {
      this.showClientFindNoRuc  = false;
      this.showClientFindRuc = true;
    }
    else {
      this.showClientFindNoRuc  = true;
      this.showClientFindRuc= false;
    }
  }

  obtainBookingData(): void {
    let booking: Booking = new Booking();
    let bookingReview: BookingReview = new BookingReview();
    let tickets: Array<Tickets> = new Array();
    console.log(this.clientSearch);
    booking.tipoIdentificacion = this.clientSearch.tipoIdentificacion;
    booking.identificacion = this.clientSearch.identificacion;
    bookingReview.cliente = this.clientSearch;
    booking.codigoRuta = this.ruta.codigo;
    bookingReview.ruta = this.ruta;
    booking.numeroBoletos = this.numberTickets;
    booking.fechaSalida = this.dateOfDeparture;
    bookingReview.fechaSalida = this.dateOfDeparture;
    bookingReview.vuelos = this.seat;
    bookingReview.pasajeros = this.passengerinfo;
    this.ticketMap.forEach(tmp => {
      for (var i = 0; i < this.numberTickets; i++) {
        let ticket: Tickets = new Tickets();
        ticket.tipoIdentificacionPasajero = this.passengerinfo[i].tipoIdentificacion;
        ticket.identificacionPasajero = this.passengerinfo[i].identificacion;
        ticket.numeroAsiento = tmp.asientos[i].numeroAsiento;
        ticket.codigoAeropuertoOrigen= tmp.vuelo.codigoAeropuertoOrigen;
        ticket.codigoAeropuertoDestino= tmp.vuelo.codigoAeropuertoDestino;
        tickets.push(ticket);
      }
    }, this);
    booking.boletos = tickets;
    console.log(booking);
    bookingReview.boletos = tickets;
    bookingReview.ticketMap = this.ticketMap;
    sessionStorage.setItem("reserva", JSON.stringify(booking));
    sessionStorage.setItem("reservaReview", JSON.stringify(bookingReview));
    this.router.navigate(['/review']);
    //this.bookingService.saveBooking(booking).subscribe(data => { console.log(data); alert("Esta parte es syncrona"); }, error => console.log(error));
  }

  private checkReviewBookingConditions(): void {
    this.reviewBooking = this.actualTicket == this.ticketMap.length * this.numberTickets ? true : false;
  }

  addSeatData(isChecked: boolean, j: number, i: number): void {
    console.log("Checked: " + isChecked + " Asiento: " + j + " Vuelo: " + i);
    if (isChecked) {
      if (this.ticketMap.length - 1 < i) {
        let ticketMapTmp: TicketMap = new TicketMap();
        ticketMapTmp.vuelo = this.seat.vuelo[i];
        ticketMapTmp.asientos.push(this.seat.vuelo[i].avion.asientos[j]);
        this.ticketMap.push(ticketMapTmp);
        this.actualTicket++;
        this.checkReviewBookingConditions();
        console.log(this.ticketMap);
      } else {
        for (let m = 0; m < this.ticketMap.length; m++) {
          if (this.ticketMap[m].vuelo.codigo == this.seat.vuelo[i].codigo) {
            if (this.ticketMap[m].asientos.length < this.numberTickets) {
              this.ticketMap[m].asientos.push(this.seat.vuelo[i].avion.asientos[j]);
              this.actualTicket++;
              this.checkReviewBookingConditions();
              console.log(this.ticketMap);
              return;
            } else {
              this.showErrorNoMoreSeats();
              this.reviewBooking = false;
              return;
            }
          }
        }
        this.showErrorFlyFound();
      }
    } else {
      for (let m = 0; m < this.ticketMap.length; m++) {
        if (this.ticketMap[m].vuelo.codigo == this.seat.vuelo[i].codigo) {
          for (var n = 0; n < this.ticketMap[m].asientos.length; n++) {
            if (this.ticketMap[m].asientos[n].codigo == this.seat.vuelo[i].avion.asientos[j].codigo) {
              this.ticketMap[m].asientos.splice(i, 1);
              this.actualTicket--;
              this.checkReviewBookingConditions();
              console.log(this.ticketMap);
              return;
            }
          }
          if (this.ticketMap[m].asientos.length == 0) {
            this.showErrorNoSeatsSelect();
            return;
          } else {
            this.showErrorNoSeatInArray();
            this.checkReviewBookingConditions();
            return;
          }
        }
      }
      this.showErrorFlyFound();
    }
  }

  private showNoPassengerFind() {
    this.toastrService.warning('No existe un pasajero con las credenciales especificadas', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }
  
  private showErrorNoMorePassangers() {
    this.toastrService.error('No se puede añadir más pasajeros', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }
  
  private showCreatePassengerBox() {
    this.toastrService.success('Se ha creado el pasajero', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }

  private showErrorSamePassenger() {
    this.toastrService.error('El pasajero ya existe', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }

  private showErrorNoMoreSeats() {
    this.toastrService.error('No se puede agregar más asientos por vuelo', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }

  private showErrorFlyFound() {
    this.toastrService.error('No se encuentra el vuelo en el arreglo', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }

  private showErrorNoSeatsSelect() {
    this.toastrService.error('El arreglo de asientos del vuelo está vacio', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }
  
  private showErrorNoSeatInArray() {
    this.toastrService.error('No se encuentra el asiento en el arreglo', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }

  
  private showNoClientFind() {
    this.toastrService.warning('No existe un cliente con las credenciales especificadas', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }
  
  private showCreateClientBox() {
    this.toastrService.success('Se ha creado el cliente', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }

  private showErrorSameClient() {
    this.toastrService.error('El cliente ya existe', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }
  
}

