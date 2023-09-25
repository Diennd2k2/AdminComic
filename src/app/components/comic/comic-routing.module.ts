import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ComicComponent } from "./comic.component";

const routes: Routes = [
  {
    path: "",
    component: ComicComponent,
    data: {
      title: "Truyện Tranh",
      breadcrumb: "Truyện Tranh",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicRoutingModule {}
