import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("../../components/dashboard/dashboard.module").then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: "genre",
    loadChildren: () =>
      import("../../components/genre/genre.module").then((m) => m.GenreModule),
    data: {
      breadcrumb: "Thể Loại",
    },
  },
  {
    path: "comic",
    loadChildren: () =>
      import("../../components/comic/comic.module").then((m) => m.ComicModule),
    data: {
      breadcrumb: "Truyện Tranh",
    },
  },
  {
    path: "chapter/:comic_id",
    loadChildren: () =>
      import("../../components/chapter/chapter.module").then(
        (m) => m.ChapterModule
      ),
    data: {
      breadcrumb: "Chương Truyện",
    },
  },
  {
    path: "user",
    loadChildren: () =>
      import("../../components/user/user.module").then((m) => m.UserModule),
    data: {
      breadcrumb: "Độc giả",
    },
  },
  {
    path: "admin",
    loadChildren: () =>
      import("../../components/admin/admin.module").then((m) => m.AdminModule),
    data: {
      breadcrumb: "Admin",
    },
  },
];
