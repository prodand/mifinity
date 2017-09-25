import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComp } from "./pages/login-page.comp";

const routes: Routes = [
  { path: 'login', component: LoginPageComp },
  { path: '**', component: LoginPageComp },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }