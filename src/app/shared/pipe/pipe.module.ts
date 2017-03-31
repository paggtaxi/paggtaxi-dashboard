import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BooleanImgPipe } from "./boolean-img.pipe";
import { CurrencyFormatPipe } from "./currency-format.pipe";
import { TableOrderingDirective } from "../directives/table-ordering.directive";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BooleanImgPipe,
    CurrencyFormatPipe,
    TableOrderingDirective
  ],
  exports: [
    BooleanImgPipe,
    CurrencyFormatPipe,
    TableOrderingDirective
  ]
})
export class PipeModule {
}
