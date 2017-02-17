import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockProductsComponent } from "./products.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full',
    data: {
      title: "Estoque"
    },
  },
  {
    path: '',
    children: [
      {
        path: 'produtos',
        component: StockProductsComponent,
        data: {
          title: 'Produtos'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StockRoutingModule {
}
