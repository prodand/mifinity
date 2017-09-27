import { Injectable } from "@angular/core";
import { ApiService } from "./api.service";
import { User } from "../model/User";

import "rxjs/add/operator/toPromise";

@Injectable()
export class LoginService {

  private user: User;
  private pingState: Promise<boolean>;

  constructor(private api: ApiService) {
  }

  login(login: string, password: string): Promise<User> {
    return this.api.login({login: login, password: password})
        .then(user => {
          this.handleUser(user);
          return this.user;
        })
  }

  isLoggedIn(): Promise<boolean> {
    if (this.user != null) {
      return Promise.resolve(true);
    }
    if (this.pingState != null) {
      return this.pingState;
    }
    this.pingState = this.api.ping()
        .then(user => {
          this.handleUser(user);
          return true;
        })
        .catch(reason => false);
    return this.pingState;
  }

  currentUser(): User {
    return this.user;
  }

  private handleUser(user: User) {
    this.user = user;
  }
}