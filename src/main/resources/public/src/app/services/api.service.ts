import { Injectable } from "@angular/core";
import { Http, URLSearchParams, Headers } from "@angular/http";
import { User } from "../model/User";

@Injectable()
export class ApiService {

  static API_BASE: string = "api/";

  constructor(private http: Http) {
  }

  /**
   * Auth functions
   */
  signUp(userInfo: User): Promise<any> {
    return this.http.post(ApiService.API_BASE + 'user/create', userInfo).toPromise();
  }

  login(credentials: {login: string, password: string}): Promise<User> {
    return this.http.post(ApiService.API_BASE + 'auth/login', credentials)
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
          headers : headers
        })
        .toPromise()
        .then(resp => resp.json() as T)
        .catch(reason => this.handleError(reason));
  }

  list<T>(resource: string): Promise<T[]> {
    return this.http.get(ApiService.API_BASE + resource + "/list")
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
        throw 'Bad credentials';
    }
    throw error;
  }
}