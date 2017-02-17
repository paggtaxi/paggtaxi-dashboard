import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from "./stock.component";

const routes: Routes = [
  {
    path: '',
    component: StockComponent,
    data: {
      title: "Estoque"
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class StockRoutingModule { }
