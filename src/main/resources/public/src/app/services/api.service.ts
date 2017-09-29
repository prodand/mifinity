import { Injectable } from "@angular/core";
import { Headers, Http, URLSearchParams } from "@angular/http";
import { Router } from "@angular/router";
import { User } from "../model/User";

@Injectable()
export class ApiService {

  static API_BASE: string = "api/";

  constructor(private http: Http, private router: Router) {
  }

  login(credentials: { login: string, password: string }): Promise<User> {
    const body = new URLSearchParams();
    body.set("login", credentials.login);
    body.set("password", credentials.password);

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(ApiService.API_BASE + 'auth/login',
        body.toString(),
        {
          headers: headers
        })
        .toPromise()
        .then(resp => {
          return resp.json() as User;
        });
  }

  ping(): Promise<User> {
    return this.http.get(ApiService.API_BASE + 'auth/ping')
        .toPromise()
        .then(resp => resp.json())
  }

  /**
   *Dao functions
   */
  create<T>(resource: string, entity: T): Promise<T> {
    return this.http.post(ApiService.API_BASE + resource + "/create", entity)
        .toPromise()
        .then(resp => resp.json() as T)
        .catch(reason => this.handleError(reason));
  }

  createForm<T>(resource: string, form: Object): Promise<T> {
    const body = new URLSearchParams();
    Object.keys(form).forEach(key => {
      body.set(key, form[key]);
    });

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post(ApiService.API_BASE + resource + "/create",
        body.toString(),
        {
          headers: headers
        })
        .toPromise()
        .then(resp => resp.json() as T)
        .catch(reason => this.handleError(reason));
  }

  list<T>(resource: string, params: Object): Promise<T[]> {
    let searchParams: URLSearchParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      searchParams.set(key, params[key]);
    });
    return this.http.get(ApiService.API_BASE + resource + "/list", {
      search: searchParams
    })
        .toPromise()
        .then(resp => resp.json() as T[])
        .catch(reason => this.handleError(reason));
  }

  update<T>(resource: string, entity: T): Promise<T> {
    return this.http.post(ApiService.API_BASE + resource + "/update", entity)
        .toPromise()
        .then(resp => resp.json() as T)
        .catch(reason => this.handleError(reason, [406]));
  }

  private handleError(error: any, ignore?: number[]) {
    ignore = ignore || [];
    if (ignore.find((status) => status == error.status)) {
      throw error;
    }
    switch (error.status) {
      case 401:
      case 403:
        this.router.navigate(['login']);
        break;
      default:
        throw error;
    }
  }
}