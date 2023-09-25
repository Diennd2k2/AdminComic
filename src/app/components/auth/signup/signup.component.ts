import { Component } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { NgToastService } from "ng-angular-popup";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent {
  public loginForm: UntypedFormGroup;
  public registerForm: UntypedFormGroup;
  public active = 1;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private _adminService: AdminService,
    private router: Router,
    private toast: NgToastService
  ) {
    this.createRegisterForm();
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

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      fullName: [""],
      email: [""],
      password: [""],
    });
  }

  onSignup() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this._adminService.signUp(this.registerForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.registerForm.reset();
          this.router.navigate(["login"]);
          this.toast.success({
            detail: "Thành công",
            summary: "Đăng ký thành công",
            duration: 5000,
          });
        },
        error: (err) => {
          alert(err?.error.message);
        },
      });
    } else {
      console.log("Form is not valid");
      alert("Your form is invalid");
    }
  }

  ngOnInit() {}
}
