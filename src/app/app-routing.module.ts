import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { content } from "./shared/routes/content-routes";
import { ContentLayoutComponent } from "./shared/layout/content-layout/content-layout.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { AdminGuard } from "./guards/admin.guard";

const routes: Routes = [
  {
    path: "auth/login",
    component: LoginComponent,
  },
  {
    path: "auth/signup",
    component: SignupComponent,
  },
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "",
    component: ContentLayoutComponent,
    children: content,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
