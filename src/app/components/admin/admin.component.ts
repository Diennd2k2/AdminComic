import { DecimalPipe } from "@angular/common";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { NgToastService } from "ng-angular-popup";
import { AdminService } from "src/app/services/admin.service";
import { TableService } from "src/app/shared/service/table.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
  providers: [TableService, DecimalPipe],
})
export class AdminComponent {
  adminForm!: FormGroup;
  adminId: string;
  adminList: any[];

  public closeResult: string;
  title = "pagination";
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  constructor(
    public service: TableService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _adminService: AdminService,
    private toast: NgToastService
  ) {
    this.service.setUserData(this.adminList);
    this.adminForm = this._fb.group({
      fullName: [""],
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
          this.adminForm.reset();
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.adminForm.reset();
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

  getAdminList() {
    this._adminService.getAdmin().subscribe((data) => {
      this.adminList = data;
    });
  }

  ngOnInit(): void {
    this.getAdminList();
  }

  addAdmin() {
    const adminData = this.adminForm.value;
    const newAdmin = {
      fullName: adminData.fullName,
      email: adminData.email,
      password: adminData.password,
    };

    this._adminService.signUp(newAdmin).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.getAdminList();
        this.adminForm.reset();
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

  onSelectAdmin(row: string) {
    this.adminId = row;
    this._adminService.getAdminById(row).subscribe((res) => {
      this.adminForm.patchValue(res);
    });
  }

  updateAdmin() {
    const adminData = this.adminForm.value;
    const newAdmin = {
      fullName: adminData.fullName,
      email: adminData.email,
      password: adminData.password,
      role: adminData.role,
    };

    this._adminService.updateAdmin(this.adminId, newAdmin).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.getAdminList();
        this.adminForm.reset();
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

  deleteAdmin() {
    this._adminService.deleteAdmin(this.adminId).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.getAdminList();
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
    this.getAdminList();
  }
}
