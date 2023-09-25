import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public loginForm: UntypedFormGroup;
  public registerForm: UntypedFormGroup;
  public active = 1;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _adminService: AdminService,
    private router: Router,
    private toast: NgToastService
  ) {
    this.createLoginForm();
  }

  owlcarousel = [
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
    {
      title: "Welcome to Multikart",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
    },
  ];
  owlcarouselOptions = {
    loop: true,
    items: 1,
    dots: true,
  };

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: [""],
      password: [""],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this._adminService.login(this.loginForm.value).subscribe({
        next: (res) => {
          console.log(res.message);
          this.loginForm.reset();
          this._adminService.storeToken(res.token);
          const tokenPayload = this._adminService.decodeToken();
          this._adminService.setFullNameForStore(tokenPayload.name);
          this._adminService.setRoleForStore(tokenPayload.role);

          this.router.navigate([""]);
          this.toast.success({
            detail: "Thành công",
            summary: res.message,
            duration: 5000,
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      console.log("Form is not valid");
      alert("Your form is invalid");
    }
  }

  ngOnInit() {}

  onSubmit() {}
}
