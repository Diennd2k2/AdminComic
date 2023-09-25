import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AgGridModule } from "@ag-grid-community/angular";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RemoveDiacriticsService } from "./services/remove-diacritics.service";
import { NgToastModule } from "ng-angular-popup";
import { TokenInterceptor } from "./interceptors/token.interceptor";

import { DashboardModule } from "./components/dashboard/dashboard.module";
import { SharedModule } from "./shared/shared.module";
import { AuthModule } from "./components/auth/auth.module";
import { GenreModule } from "./components/genre/genre.module";
import { ComicModule } from "./components/comic/comic.module";
import { ChapterModule } from "./components/chapter/chapter.module";
import { UserModule } from "./components/user/user.module";
import { AdminModule } from "./components/admin/admin.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    HttpClientModule,
    AppRoutingModule,
    DashboardModule,
    AuthModule,
    SharedModule,
    AgGridModule,
    GenreModule,
    ComicModule,
    ChapterModule,
    UserModule,
    AdminModule,
    NgToastModule,
  ],
  providers: [
    RemoveDiacriticsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
