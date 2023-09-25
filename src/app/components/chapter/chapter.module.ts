import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "src/app/shared/shared.module";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { NgxDropzoneModule } from "ngx-dropzone";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { ChapterComponent } from "./chapter.component";
import { ChapterRoutingModule } from "./chapter-routing.module";

@NgModule({
  declarations: [ChapterComponent],
  imports: [
    CommonModule,
    ChapterRoutingModule,
    SharedModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    CKEditorModule,
    NgxDropzoneModule,
  ],
})
export class ChapterModule {}
