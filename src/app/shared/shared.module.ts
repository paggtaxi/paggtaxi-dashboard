import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ListErrorsComponent } from "./components/list-errors/list-errors.component";
import { CurrencyFormatComponent } from "./components/currency-format/currency-format.component";
import { Daterangepicker } from "ng2-daterangepicker";
import { CustomPaginationControlsComponent } from "./pagination/custom-pagination.component";
import { Ng2PaginationModule } from "ng2-pagination";
import { CurrencyMaskModule } from "ng2-currency-mask";
import { LaddaModule } from "angular2-ladda";
import { PipeModule } from "./pipe/pipe.module";
import { CardHeaderControlsComponent } from './components/card-header-controls/card-header-controls.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { CalendarModule } from "primeng/primeng";

@NgModule({
  imports: [
    CommonModule,
    Ng2PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Daterangepicker,
    CurrencyMaskModule,
    LaddaModule,
    PipeModule,
    CalendarModule
  ],
  declarations: [
    ListErrorsComponent,
    CurrencyFormatComponent,
    CustomPaginationControlsComponent,
    CardHeaderControlsComponent,
    // DatepickerComponent
  ],
  exports: [
    CommonModule,
    Ng2PaginationModule,
    FormsModule,
    ReactiveFormsModule,
    Daterangepicker,
    CurrencyMaskModule,
    CalendarModule,
    LaddaModule,
    PipeModule,
    ListErrorsComponent,
    CurrencyFormatComponent,
    CustomPaginationControlsComponent,
    CardHeaderControlsComponent,
    // DatepickerComponent
  ]
})
export class SharedModule {
}