import { DecimalPipe } from "@angular/common";
import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ComicService } from "src/app/services/comic.service";
import { GenreService } from "src/app/services/genre.service";
import { RemoveDiacriticsService } from "src/app/services/remove-diacritics.service";
import { TableService } from "src/app/shared/service/table.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "app-comic",
  templateUrl: "./comic.component.html",
  styleUrls: ["./comic.component.scss"],
  providers: [TableService, DecimalPipe],
  encapsulation: ViewEncapsulation.None,
})
export class ComicComponent implements OnInit {
  comicForm!: FormGroup;
  constructor(
    private _comicService: ComicService,
    private _genreService: GenreService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private toast: NgToastService,
    private removeDiacriticsService: RemoveDiacriticsService
  ) {
    this.comicForm = this._fb.group({
      title: [""],
      slug: [""],
      description: [""],
      coverImage: [""],
      genreIds: new FormControl([]),
      status: [1],
    });
  }

  public closeResult: string;
  genres: any[] = [];
  settings: IDropdownSettings = {};
  comicList: any[];
  comicId: string;

  @ViewChild("fileInput") fileInput: any;
  selectedFile: File | null;
  selectedImageUrl: string | null;
  defaultImageUrl: string = "../../assets/images/noimg.jpg";

  onFileSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result;
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      this.selectedFile = null;
      this.selectedImageUrl = null;
    }
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          this.comicForm.reset();
          this.comicForm.get("genreIds").setValue([]);
          this.defaultImageUrl = "../../assets/images/noimg.jpg";
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          this.comicForm.reset();
          this.comicForm.get("genreIds").setValue([]);
          this.defaultImageUrl = "../../assets/images/noimg.jpg";
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
      const slug = this.removeDiacriticsService.removeDiacritics(name);
      return slug;
    }
  }

  loadGenres() {
    this._genreService.getGenreList().subscribe((data) => {
      this.genres = data;
    });
  }

  ngOnInit(): void {
    this.loadGenres();
    this.getComicList();
    this.settings = {
      idField: "genre_id",
      textField: "genre_Name",
      enableCheckAll: false,
      allowSearchFilter: true,
      noFilteredDataAvailablePlaceholderText: "Không tìm thấy thể loại",
    };

    const comicTitleControl = this.comicForm.get("title");

    comicTitleControl?.valueChanges.subscribe((value: string) => {
      const slugControl = this.comicForm.get("slug");
      const slug = this.createSlugFromTitle(value);
      slugControl?.setValue(slug);
    });
  }

  getComicList() {
    this._comicService.getComicList().subscribe((data) => {
      this.comicList = data;
    });
  }

  onSelectComic(row) {
    this.comicId = row;
    this._comicService.getComicById(row).subscribe((res: any) => {
      const genreIds = res.comicGenres.map((genre) => genre.genre);
      this.comicForm.get("genreIds").setValue(genreIds);
      this.defaultImageUrl = res.coverImage;
      this.comicForm.patchValue(res);
    });
  }

  addComic() {
    if (!this.selectedFile) {
      console.error("Vui lòng chọn hình ảnh.");
      return;
    }

    const formData = new FormData();
    formData.append("Title", this.comicForm.value.title);
    formData.append("Slug", this.comicForm.value.slug);
    formData.append("formFile", this.selectedFile);
    formData.append("Description", this.comicForm.value.description);

    for (const genreId of this.comicForm.value.genreIds) {
      formData.append("GenreIds", genreId.genre_id);
    }
    this._comicService.addComic(formData).subscribe({
      next: (res) => {
        this.modalService.dismissAll();
        this.getComicList();
        this.comicForm.reset();
        this.comicForm.get("genreIds").setValue([]);
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

  updateComic() {
    const formData = new FormData();
    formData.append("Title", this.comicForm.value.title);
    formData.append("Slug", this.comicForm.value.slug);
    formData.append("Description", this.comicForm.value.description);
    formData.append("Status", this.comicForm.value.status);

    if (this.selectedFile) {
      formData.append("formFile", this.selectedFile);
    } else {
      formData.append("CoverImage", this.comicForm.value.coverImage);
    }

    for (const genre of this.comicForm.value.genreIds) {
      formData.append("GenreIds", genre.genre_id);
    }

    this._comicService.updateComic(this.comicId, formData).subscribe({
      next: (res) => {
        this.modalService.dismissAll();
        this.getComicList();
        this.comicForm.reset();
        this.comicForm.get("genreIds").setValue([]);
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

  deleteComic() {
    this._comicService.deleteComic(this.comicId).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.getComicList();
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
