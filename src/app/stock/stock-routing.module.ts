import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockProductsComponent } from "./products.component";
import { AddProductsComponent } from "./add-products/add-products.component";
import { ListProductEntryComponent } from "./list-product-entry/list-product-entry.component";
import { AddProductEntryComponent } from "./add-product-entry/add-product-entry.component";
import { AddProductOutComponent } from "./add-product-out/add-product-out.component";

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
      },
      {
        path: 'entradas-produtos',
        component: ListProductEntryComponent,
        data: {
          title: 'Entradas de Produtos'
        }
      },
      {
        path: 'entradas-produtos/:productId',
        component: ListProductEntryComponent,
        data: {
          title: 'Entradas de Produtos'
        }
      },
      {
        path: 'adicionar-produto',
        component: AddProductsComponent,
        data: {
          title: 'Adicionar Produtos'
        }
      },
      {
        path: 'editar-produto/:id',
        component: AddProductsComponent,
        data: {
          title: 'Editar Produto'
        }
      },
      {
        path: 'adicionar-entrada',
        component: AddProductEntryComponent,
        data: {
          title: 'Adicionar Entrada de Produto'
        }
      },
      {
        path: 'adicionar-saida',
        component: AddProductOutComponent,
        data: {
          title: 'Adicionar Saída de Produto'
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
