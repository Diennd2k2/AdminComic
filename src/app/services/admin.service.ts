import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, map } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class AdminService {
  private baseUrl: string = "http://103.200.20.236/";
  private adminPayload: any;
  private fullName$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor(private _http: HttpClient, private router: Router) {
    this.adminPayload = this.decodeToken();
  }

  signUp(adminObj: any) {
    return this._http
      .post<any>(`${this.baseUrl}api/Admin/register`, adminObj)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  login(loginObj: any) {
    return this._http
      .post<any>(`${this.baseUrl}api/Admin/login`, loginObj)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getAdmin() {
    return this._http.get<any>(`${this.baseUrl}api/Admin`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getAdminById(adminId: string) {
    return this._http.get<any>(`${this.baseUrl}api/Admin/${adminId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateAdmin(adminId: string, adminObj: any) {
    return this._http
      .put<any>(`${this.baseUrl}api/Admin/${adminId}`, adminObj)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteAdmin(adminId: string) {
    return this._http.delete<any>(`${this.baseUrl}api/Admin/${adminId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  storeToken(tokenValue: string) {
    localStorage.setItem("token", tokenValue);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem("token");
  }

  signOut() {
    localStorage.clear();
    this.router.navigate(["auth/login"]);
  }

  decodeToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token));
    return jwtHelper.decodeToken(token);
  }

  getFullNameFromToken() {
    if (this.adminPayload) return this.adminPayload.name;
  }

  getRoleFromToken() {
    if (this.adminPayload) return this.adminPayload.role;
  }

  public getRoleFromStore() {
    return this.role$.asObservable();
  }

  public setRoleForStore(role: string) {
    this.role$.next(role);
  }

  public getFullNameFromStore() {
    return this.fullName$.asObservable();
  }

  public setFullNameForStore(fullname: string) {
    this.fullName$.next(fullname);
  }
}
