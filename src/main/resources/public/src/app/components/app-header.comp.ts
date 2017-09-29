import { Component, OnInit } from '@angular/core';
import { LoginService } from "../services/login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  template: `
    <div class="flex header">
      <a routerLink="/card-form">New Card</a>
      <a routerLink="/search">Search</a>
      <a class="href" (click)="onLogoutClick()">Logout</a>
    </div>
  `
})

export class AppHeaderComp implements OnInit {
  constructor(private login: LoginService, private router: Router) {
  }

  ngOnInit() {
  }

  onLogoutClick() {
    this.login.logout()
        .then(success => this.router.navigate(["login"]));
  }
}