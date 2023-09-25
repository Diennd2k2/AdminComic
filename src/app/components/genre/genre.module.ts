import { NgModule } from "@angular/core";
import { GenreComponent } from "./genre.component";
import { CommonModule } from "@angular/common";
import { GenreRoutingModule } from "./genre-routing.module";
import { SharedModule } from "src/app/shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [GenreComponent],
  imports: [
    CommonModule,
    GenreRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
  ],
})
export class GenreModule {}
