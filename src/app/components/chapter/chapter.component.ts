import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ChapterService } from "src/app/services/chapter.service";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgToastService } from "ng-angular-popup";
import { RemoveDiacriticsService } from "src/app/services/remove-diacritics.service";
import { CloudinaryService } from "src/app/services/cloudinary.service";
import { ComicService } from "src/app/services/comic.service";

@Component({
  selector: "app-chapter",
  templateUrl: "./chapter.component.html",
  styleUrls: ["./chapter.component.scss"],
})
export class ChapterComponent implements OnInit {
  public closeResult: string;
  comicId: string;
  chapterList: any[];
  chapterId: string;
  public Editor = ClassicEditor;
  chapterForm!: FormGroup;
  uploadedImageUrls: string[] = [];
  cloudName = "dwvtpyyft";
  uploadPreset = "dkqqvsof";
  myWidget: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _chapterService: ChapterService,
    private _comicService: ComicService,
    private _fb: FormBuilder,
    private toast: NgToastService,
    private removeDiacriticsService: RemoveDiacriticsService,
    private cloudinary: CloudinaryService
  ) {
    this.chapterForm = this._fb.group({
      title: [""],
      slug: [""],
      arrange: [0],
      imageUrls: [""],
    });
  }

  goBack() {
    this.router.navigate(["comic"]);
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.chapterForm.reset();
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.chapterForm.reset();
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

  createSlugFromTitle(name: string): string {
    if (name === null || name === undefined) {
      return "";
    } else {
      const slug = this.removeDiacriticsService.removeDiacritics(
        name.toLowerCase()
      );
      return slug;
    }
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.comicId = params["comic_id"];
    });
    this.getChapterList();

    const chapterTitleControl = this.chapterForm.get("title");

    chapterTitleControl?.valueChanges.subscribe((value: string) => {
      const slugControl = this.chapterForm.get("slug");
      const slug = this.createSlugFromTitle(value);
      slugControl?.setValue(slug);
    });
    this.cloudinary
      .createUploadWidget(
        {
          cloudName: this.cloudName,
          uploadPreset: this.uploadPreset,
          sources: ["local"],
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            console.log("Hoàn thành! Đây là thông tin hình ảnh: ", result.info);
            const secureUrl = result.info.secure_url;
            this.uploadedImageUrls.push(secureUrl);
            this.updateTextarea();
          }
        }
      )
      .subscribe((widget) => (this.myWidget = widget));
  }

  openWidget() {
    if (this.myWidget) {
      this.myWidget.open();
    }
  }

  updateTextarea() {
    const textarea = document.getElementById(
      "imageUrls"
    ) as HTMLTextAreaElement;
    textarea.value = this.uploadedImageUrls.join("\n");
    this.chapterForm.get("imageUrls").setValue(textarea.value);
  }

  getChapterList() {
    this._chapterService.getListChapter(this.comicId).subscribe((data) => {
      this.chapterList = data;
    });
  }

  calculateMaxArrange(): number {
    let maxArrange = 0;
    if (this.chapterList && this.chapterList.length > 0) {
      maxArrange = Math.max(
        ...this.chapterList.map((chapter) => chapter.arrange)
      );
    }
    return maxArrange;
  }

  calculateNewArrange(): number {
    const maxArrange = this.calculateMaxArrange();
    return maxArrange + 1;
  }

  addChapter() {
    const chapterData = this.chapterForm.value;
    const imageUrls = chapterData.imageUrls
      .split("\n")
      .filter((url) => url.trim() !== "");
    console.log(imageUrls);

    const newChapter = {
      title: chapterData.title,
      slug: chapterData.slug,
      arrange: this.calculateNewArrange(),
      imageUrls: imageUrls,
    };

    this._chapterService.addChapter(this.comicId, newChapter).subscribe({
      next: (res) => {
        this.modalService.dismissAll();
        this.chapterForm.reset();
        this.getChapterList();
        this.toast.success({
          detail: "Thành Công",
          summary: "Thêm mới thành công",
          duration: 5000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSelectChapter(row) {
    this.chapterId = row;
    this._chapterService.getChapterById(row).subscribe((chapter: any) => {
      this.chapterForm.patchValue({
        title: chapter.title,
        slug: chapter.slug,
        arrange: chapter.arrange,
      });
      const imageUrls = chapter.images.map((image: any) => image.urlImage);
      this.chapterForm.get("imageUrls").setValue(imageUrls.join("\n"));
    });
  }

  updateChapter() {
    const chapterData = this.chapterForm.value;
    const imageUrls = chapterData.imageUrls
      .split("\n")
      .filter((url) => url.trim() !== "");
    const newChapter = {
      title: chapterData.title,
      slug: chapterData.slug,
      arrange: chapterData.arrange,
      imageUrls: imageUrls,
    };

    this._chapterService.updateChapter(this.chapterId, newChapter).subscribe({
      next: (res) => {
        this.modalService.dismissAll();
        this.chapterForm.reset();
        this.getChapterList();
        this.toast.success({
          detail: "Thành Công",
          summary: "Cập nhật thành công",
          duration: 5000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteChapter() {
    this._chapterService.deleteChapter(this.chapterId).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.getChapterList();
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
}
