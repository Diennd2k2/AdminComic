import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ComicComponent } from "./comic.component";
import { ComicRoutingModule } from "./comic-routing.module";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  declarations: [ComicComponent],
  imports: [
    CommonModule,
    ComicRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
})
export class ComicModule {}
