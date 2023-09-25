import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class GenreService {
  constructor(private _http: HttpClient) {}
  private baseUrl: string = "http://103.200.20.236/";

  getGenreList() {
    return this._http.get<any[]>(`${this.baseUrl}api/Genre`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getGenreById(id: number) {
    return this._http.get<any[]>(`${this.baseUrl}api/Genre/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addGenre(genreData: any) {
    return this._http.post<any>(`${this.baseUrl}api/Genre`, genreData).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  updateGenre(id: number, data: any) {
    return this._http.put<any>(`${this.baseUrl}api/Genre/${id}`, data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  deleteGenre(id: number) {
    return this._http.delete(`${this.baseUrl}api/Genre/${id}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
