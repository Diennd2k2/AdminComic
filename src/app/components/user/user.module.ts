import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { NgxDropzoneModule } from "ngx-dropzone";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { UserComponent } from "./user.component";
import { UserRoutingModule } from "./user-routing.module";
import { NgxPaginationModule } from "ngx-pagination";

@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
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
export class UserModule {}
