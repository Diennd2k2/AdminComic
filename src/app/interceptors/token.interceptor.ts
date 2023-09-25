import { NgToastService } from "ng-angular-popup";
import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { AdminService } from "../services/admin.service";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private admin: AdminService,
    private toast: NgToastService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const myToken = this.admin.getToken();
    if (myToken) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` },
      });
    }
    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.toast.warning({
              detail: "Warning",
              summary: "Đăng nhập hết hạn, vui lòng đăng nhập lại!",
            });
            this.router.navigate(["auth/login"]);
          }
        }
        return throwError(() => new Error("Some other error occured."));
      })
    );
  }
}
