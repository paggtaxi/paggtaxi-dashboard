import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SAMPLERoutingModule } from './SAMPLE-routing.module';
import { SAMPLEComponent } from "./SAMPLE.component";

@NgModule({
  imports: [
    CommonModule,
    SAMPLERoutingModule
  ],
  declarations: [SAMPLEComponent]
})
export class SAMPLEModule {
}
