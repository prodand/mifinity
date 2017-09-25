import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login-page',
  templateUrl: 'html/pages/login-page.comp.html',
})
export class LoginPageComp implements OnInit {

  login: string;
  password: string;

  constructor() {
  }

  ngOnInit() {
  }

  onLoginClick() {

  }
}