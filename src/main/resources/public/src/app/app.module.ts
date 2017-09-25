import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

import { RoutingModule } from "./app-routing.module";
import { AppComp } from "./components/app.component";
import { LoginPageComp } from "./pages/login-page.comp";
import { ApiService } from "./services/api.service";

import "rxjs/add/operator/toPromise";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RoutingModule,
  ],
  declarations: [AppComp, LoginPageComp],
  providers: [ApiService],
  bootstrap: [AppComp],
})
export class AppModule {
}
