import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "../services/admin.service";
@Injectable({
  providedIn: "root",
})
export class AdminGuard {
  constructor(public _adminService: AdminService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (this._adminService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(["auth/login"]);
      return false;
    }
  }
}
