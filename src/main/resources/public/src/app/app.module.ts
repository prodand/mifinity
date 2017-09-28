import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpModule } from '@angular/http';

import { RoutingModule } from "./app-routing.module";
import { AppComp } from "./components/app.component";
import { LoginPageComp } from "./pages/login-page.comp";
import { CardFormPageComp } from "./pages/card-form-page.comp";
import { ApiService } from "./services/api.service";
import { LoginService } from "./services/login.service";
import { AuthGuard } from "./services/auth-guard.service";

import "rxjs/add/operator/toPromise";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RoutingModule,
  ],
  declarations: [AppComp, LoginPageComp, CardFormPageComp],
  providers: [ApiService, LoginService, AuthGuard],
  bootstrap: [AppComp],
})
export class AppModule {
}
