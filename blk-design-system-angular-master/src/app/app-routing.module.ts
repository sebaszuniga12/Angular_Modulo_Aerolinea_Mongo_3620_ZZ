import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { IndexComponent } from "./pages/index/index.component";
import { ProfilepageComponent } from "./pages/profilepage/profilepage.component";
import { LoginpageComponent } from "./pages/loginpage/loginpage.component";
import { RoutepageComponent } from "./pages/routepage/routepage.component";
import { CreateBookingComponent } from "./pages/createBookingPage/createbookingpage.component";
import { LandingpageComponent } from "./pages/landingpage/landingpage.component";
import { ReviewBookingComponent } from "./pages/reviewBookingPage/review-booking/review-booking.component";
import { ServerBookingReturnComponent } from "./pages/reviewBookingServerPage/server-booking-return/server-booking-return.component";

const routes: Routes = [
  { path: "", component: LoginpageComponent },
  { path: "home", component: IndexComponent },
  { path: "profile", component: ProfilepageComponent },
  { path: "booking", component: CreateBookingComponent },
  { path: "route", component: RoutepageComponent },
  { path: "login", component: LoginpageComponent },
  { path: "landing", component: LandingpageComponent },
  { path: "review", component: ReviewBookingComponent },
  { path: "savedReview", component: ServerBookingReturnComponent }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: []
})
export class AppRoutingModule { }
