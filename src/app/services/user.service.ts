import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private baseUrl: string = "http://103.200.20.236/";
  constructor(private _http: HttpClient, private router: Router) {}

  signUp(userObj: any) {
    return this._http
      .post<any>(`${this.baseUrl}api/User/register`, userObj)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  login(loginObj: any) {
    return this._http.post<any>(`${this.baseUrl}api/User/login`, loginObj).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUser() {
    return this._http.get<any>(`${this.baseUrl}api/User`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getUserById(userId: string) {
    return this._http.get<any>(`${this.baseUrl}api/User/${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateUser(userId: string, userObj: any) {
    return this._http
      .put<any>(`${this.baseUrl}api/User/${userId}`, userObj)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteUser(userId: string) {
    return this._http.delete<any>(`${this.baseUrl}api/User/${userId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
