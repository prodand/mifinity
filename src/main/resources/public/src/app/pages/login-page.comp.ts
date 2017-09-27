import { Component, OnInit } from "@angular/core";
import { LoginService } from "../services/login.service";
import { ApiService } from "../services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'login-page',
  templateUrl: 'html/pages/login-page.comp.html',
})
export class LoginPageComp implements OnInit {

  login: string;
  password: string;
  errorMessage: string;
  warning: string;

  constructor(private loginService: LoginService, private apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
  }

  onLoginClick() {
    if (this.login && this.password) {
      this.loginService.login(this.login, this.password)
          .then(user => {
            this.router.navigate(["card-form"]);
          })
          .catch(error => {
            if (error.status == 401) {
              this.showWarning("No such user. Creating new one...");
              this.createUser();
            }
          });
    }
  }

  createUser() {
    this.apiService.createForm("user", {login: this.login, password: this.password})
        .then(user => {
          this.success();
          this.loginService.login(this.login, this.password)
              .then(user => {
                this.router.navigate(["card-form"]);
              })
              .catch(error => {
                this.showError("Server error: " + error.status);
              });
        });
  }

  private showWarning(message: string) {
    this.errorMessage = "";
    this.warning = message;
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.warning = "";
  }

  private success() {
    this.errorMessage = "";
    this.warning = "";
  }
}