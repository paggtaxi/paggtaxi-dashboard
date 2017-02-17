import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
//Layouts
import { FullLayoutComponent } from "./layouts/full-layout.component";
import { AuthGuard } from "./auth/auth-guard.service";
import { SimpleLayoutComponent } from "./layouts/simple-layout.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'estoque',
        loadChildren: './stock/stock.module#StockModule',
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: 'auth',
    component: SimpleLayoutComponent,
    data: {
      title: 'Usuário'
    },
    children: [
      {
        path: '',
        loadChildren: './auth/auth.module#AuthModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
