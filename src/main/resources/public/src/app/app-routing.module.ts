import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComp } from "./pages/login-page.comp";
import { CardFormPageComp } from "./pages/card-form-page.comp";
import { AuthGuard } from "./services/auth-guard.service";

const routes: Routes = [
  {path: 'login', component: LoginPageComp},
  {
    path: 'card-form',
    component: CardFormPageComp,
    canActivate: [AuthGuard]
  },
  {path: '**', component: LoginPageComp},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule {
}