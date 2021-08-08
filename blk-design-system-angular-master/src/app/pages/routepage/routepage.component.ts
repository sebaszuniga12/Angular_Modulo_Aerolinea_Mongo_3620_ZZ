import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ScheduledFlightService } from '../../services/scheduled-flight.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from 'ng-uikit-pro-standard';

@Component({
  selector: "app-routepage",
  templateUrl: "routepage.component.html"
})
export class RoutepageComponent implements OnInit, OnDestroy {
  show: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();
  rutas: any[] = [];
  reactiveForm: FormGroup;
  scheduledFlightCityOrigin: String = "";
  scheduledFlightCityDestination: String = "";
  monthOfDeparture: any;
  currentDate: Date = new Date();
  dateOfDeparture: string;
  onlyletters = "[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]";
  isCollapsed = true;
  public isCollapsed2 = false;
  constructor(private service: ScheduledFlightService, private router: Router,private builder: FormBuilder,private toastrService: ToastService) {}

  ngOnInit() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("profile-page");
    this.reactiveForm = this.builder.group({
      origen: [null, Validators.required],
      destino: [null, Validators.required]
    });
  }

  showWarning() {
    this.toastrService.warning('No se encontraron rutas con esos parametros', undefined, {
      positionClass: 'md-toast-bottom-right'
 });
  }

  ngOnDestroy() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("profile-page");
  }

  public searchScheduleFlight(scheduledFlightCityOrigin: String, scheduledFlightCityDestination: String, dateOfDeparture:string) {
    this.show = true;
    this.monthOfDeparture = dateOfDeparture.split("-");
    this.service.getUbicacion(scheduledFlightCityOrigin, scheduledFlightCityDestination,this.monthOfDeparture[1]).pipe(takeUntil(this.destroy$)).subscribe(
      (rutas: any) => {
        console.log(rutas);
        this.rutas = rutas;
        if (this.rutas.length == 0)
        this.showWarning();
      }
    );
    this.dateOfDeparture = dateOfDeparture;
  }

  searchRoutes() {
    this.router.navigate(['/route']);
  }

  searchClient() {
    this.router.navigate(['/scheduledFlight/searchClient']);
  }

  public obtainRutaInformation(codigo: number): void{
    sessionStorage.clear();
    sessionStorage.setItem("ruta",JSON.stringify(this.rutas[codigo]));
    sessionStorage.setItem("fechaSalida",this.dateOfDeparture);
    this.router.navigate(['/booking']);
  }

}
