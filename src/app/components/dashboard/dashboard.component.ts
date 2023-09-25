import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/services/admin.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  constructor(private _adminService: AdminService) {}

  public admins: any = [];
  public fullName: string = "";
  public role!: string;

  ngOnInit() {
    this._adminService.getAdmin().subscribe((res) => {
      this.admins = res;
    });

    this._adminService.getFullNameFromStore().subscribe((val) => {
      const fullNameFromToken = this._adminService.getFullNameFromToken();
      this.fullName = val || fullNameFromToken;
    });

    this._adminService.getRoleFromStore().subscribe((val) => {
      const roleFromToken = this._adminService.getRoleFromToken();
      this.role = val || roleFromToken;
    });
  }

  logOut() {
    this._adminService.signOut();
  }
}
