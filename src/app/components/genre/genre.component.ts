import { DecimalPipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GenreService } from "src/app/services/genre.service";
import { RemoveDiacriticsService } from "src/app/services/remove-diacritics.service";
import { TableService } from "src/app/shared/service/table.service";
import { NgToastService } from "ng-angular-popup";

@Component({
  selector: "app-genre",
  templateUrl: "./genre.component.html",
  styleUrls: ["./genre.component.scss"],
  providers: [TableService, DecimalPipe],
})
export class GenreComponent implements OnInit {
  genreForm!: FormGroup;
  genreId: number;
  genreList: any[];

  public closeResult: string;
  title = "pagination";
  page: number = 1;
  count: number = 0;
  tableSize: number = 5;
  tableSizes: any = [5, 10, 15, 20];

  constructor(
    public service: TableService,
    private modalService: NgbModal,
    private _fb: FormBuilder,
    private _genreService: GenreService,
    private removeDiacriticsService: RemoveDiacriticsService,
    private toast: NgToastService
  ) {
    this.service.setUserData(this.genreList);
    this.genreForm = this._fb.group({
      genre_Name: [""],
      slug: [""],
      status: [1],
    });
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
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

  getGenreList() {
    this._genreService.getGenreList().subscribe((data) => {
      this.genreList = data;
    });
  }

  createSlugFromName(name: string): string {
    if (name === null || name === undefined) {
      return "";
    } else {
      const slug = this.removeDiacriticsService.removeDiacritics(
        name.toLocaleLowerCase()
      );
      return slug;
    }
  }

  ngOnInit(): void {
    this.getGenreList();
    const genreNameControl = this.genreForm.get("genre_Name");

    genreNameControl?.valueChanges.subscribe((value: string) => {
      const slugControl = this.genreForm.get("slug");
      const slug = this.createSlugFromName(value);
      slugControl?.setValue(slug);
    });
  }

  addGenre() {
    const genreData = this.genreForm.value;
    const newGenre = {
      genre_Name: genreData.genre_Name,
      slug: genreData.slug,
    };

    this._genreService.addGenre(newGenre).subscribe({
      next: (val: any) => {
        this.modalService.dismissAll();
        this.getGenreList();
        this.genreForm.reset();
        this.toast.success({
          detail: "Thành Công",
          summary: "Thêm mới thành công",
          duration: 5000,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  onSelectGenre(row: number) {
    this.genreId = row;
    this._genreService.getGenreById(row).subscribe((res) => {
      this.genreForm.patchValue(res);
    });
  }

  updateGenre() {
    const genreData = this.genreForm.value;
    const newGenre = {
      genre_Name: genreData.genre_Name,
      slug: genreData.slug,
      status: genreData.status,
    };

    this._genreService.updateGenre(this.genreId, newGenre).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.getGenreList();
        this.toast.success({
          detail: "Thành Công",
          summary: "Cập nhật thành công",
          duration: 5000,
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteGenre() {
    this._genreService.deleteGenre(this.genreId).subscribe({
      next: (res: any) => {
        this.modalService.dismissAll();
        this.getGenreList();
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

  onTableDataChange(event: any) {
    this.page = event;
    this.getGenreList();
  }
}
