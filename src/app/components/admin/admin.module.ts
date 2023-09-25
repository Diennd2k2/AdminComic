import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { NgxDropzoneModule } from "ngx-dropzone";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { AdminComponent } from "./admin.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    CKEditorModule,
    NgxDropzoneModule,
    NgxPaginationModule,
  ],
})
export class AdminModule {}
