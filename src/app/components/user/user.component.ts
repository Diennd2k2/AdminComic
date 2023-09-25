import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgToastService } from "ng-angular-popup";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.scss"],
})
export class UserComponent {
  userForm!: FormGroup;
  userId: string;
  userList: any[];

  public closeResult: string;
  title = "pagination";
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  constructor(
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _userService: UserService,
    private toast: NgToastService
  ) {
    this.userForm = this._fb.group({
      nickName: [""],
      email: [""],
      password: [""],
      role: [""],
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.userForm.reset();
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.userForm.reset();
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }

  getUserList() {
    this._userService.getUser().subscribe((data) => {
      this.userList = data;
    });
  }

  ngOnInit(): void {
    this.getUserList();
  }

  addUser() {
    const userData = this.userForm.value;
    const newuser = {
      nickName: userData.nickName,
      email: userData.email,
      password: userData.password,
    };

    this._userService.signUp(newuser).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.getUserList();
        this.userForm.reset();
        this.toast.success({
          detail: "Thành Công",
          summary: "Thêm mới thành công",
          duration: 5000,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onSelectUser(row: string) {
    this.userId = row;
    this._userService.getUserById(row).subscribe((res) => {
      this.userForm.patchValue(res);
      console.log(res);
    });
  }

  updateUser() {
    const userData = this.userForm.value;
    const newuser = {
      nickName: userData.nickName,
      email: userData.email,
      password: userData.password,
      role: userData.role,
    };

    this._userService.updateUser(this.userId, newuser).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.getUserList();
        this.userForm.reset();
        this.toast.success({
          detail: "Thành Công",
          summary: "Cập nhật thành công",
          duration: 5000,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteUser() {
    this._userService.deleteUser(this.userId).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.getUserList();
        this.toast.success({
          detail: "Thành Công",
          summary: "Xóa thành công",
          duration: 5000,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.getUserList();
  }
}
