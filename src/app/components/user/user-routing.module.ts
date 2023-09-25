import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user.component";
const routes: Routes = [
  {
    path: "",
    component: UserComponent,
    data: {
      title: "Đọc giả",
      breadcrumb: "Độc giả",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
