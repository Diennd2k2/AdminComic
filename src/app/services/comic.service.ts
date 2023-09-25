import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ComicService {
  constructor(private _http: HttpClient) {}
  private baseUrl: string = "http://103.200.20.236/";

  getComicList() {
    return this._http.get<any[]>(`${this.baseUrl}api/Comic`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getComicById(comicId: string) {
    return this._http.get<any[]>(`${this.baseUrl}api/Comic/${comicId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  addComic(comicData: any) {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this._http
      .post<any>(`${this.baseUrl}api/Comic`, comicData, httpOptions)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  updateComic(comicId: string, comicData: any) {
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this._http
      .put<any>(`${this.baseUrl}api/Comic/${comicId}`, comicData, httpOptions)
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        })
      );
  }

  deleteComic(comicId: string) {
    return this._http.delete<any>(`${this.baseUrl}api/Comic/${comicId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
