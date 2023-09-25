import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ChapterService {
  constructor(private _http: HttpClient) {}
  private baseUrl: string = "http://103.200.20.236/";

  getListChapter(comicId: string) {
    return this._http.get<any[]>(`${this.baseUrl}api/Chapter/${comicId}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  getChapterById(chapterId: string) {
    return this._http
      .get<any[]>(`${this.baseUrl}api/Chapter/chapter/${chapterId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  addChapter(comicId: string, chapterData: any) {
    return this._http
      .post<any>(`${this.baseUrl}api/Chapter/${comicId}`, chapterData)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  updateChapter(chapterId: string, chapterData: any) {
    return this._http
      .put<any>(`${this.baseUrl}api/Chapter/${chapterId}`, chapterData)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteChapter(chapterId: string) {
    return this._http
      .delete<any>(`${this.baseUrl}api/Chapter/${chapterId}`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
