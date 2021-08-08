import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { ProgressbarModule } from "ngx-bootstrap/progressbar";
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { CollapseModule } from "ngx-bootstrap/collapse";
import { TabsModule } from "ngx-bootstrap/tabs";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { AlertModule } from "ngx-bootstrap/alert";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { CarouselModule } from "ngx-bootstrap/carousel";
import { ModalModule } from "ngx-bootstrap/modal";
import { JwBootstrapSwitchNg2Module } from "jw-bootstrap-switch-ng2";
import { PopoverModule } from "ngx-bootstrap/popover";

import { IndexComponent } from "./index/index.component";
import { ProfilepageComponent } from "./profilepage/profilepage.component";
import { RoutepageComponent } from "./routepage/routepage.component";
import { LoginpageComponent } from "./loginpage/loginpage.component";
import { CreateBookingComponent } from "./createBookingPage/createbookingpage.component";
import { LandingpageComponent } from "./landingpage/landingpage.component";
import { ReviewBookingComponent } from './reviewBookingPage/review-booking/review-booking.component';
import { ServerBookingReturnComponent } from './reviewBookingServerPage/server-booking-return/server-booking-return.component';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    BsDropdownModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    CollapseModule.forRoot(),
    JwBootstrapSwitchNg2Module,
    TabsModule.forRoot(),
    PaginationModule.forRoot(),
    AlertModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CarouselModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    LoginpageComponent ,
    RoutepageComponent,
    IndexComponent,
    CreateBookingComponent,
    ProfilepageComponent,
    LandingpageComponent,
    ReviewBookingComponent,
    ServerBookingReturnComponent
  ],
  exports: [
    LoginpageComponent,
    RoutepageComponent,
    IndexComponent,
    CreateBookingComponent,
    ProfilepageComponent,
    LandingpageComponent
  ],
  providers: []
})
export class PagesModule {}
