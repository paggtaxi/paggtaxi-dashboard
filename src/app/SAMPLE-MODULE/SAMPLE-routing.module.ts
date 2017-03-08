import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SAMPLEComponent } from "./SAMPLE.component";

const routes: Routes = [
  {
    path: '',
    component: SAMPLEComponent,
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
export class SAMPLERoutingModule { }
