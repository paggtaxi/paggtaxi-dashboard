import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { StockRoutingModule } from "./stock-routing.module";
import { StockProductsComponent } from "./products.component";
import { ProductsService } from "./products.service";
import { AddProductsComponent } from "./add-products/add-products.component";
import { MenuComponent } from "./menu/menu.component";
import { SchemaFormModule, WidgetRegistry } from "angular2-schema-form";
import { CustomWidgetRegistry } from "../shared/form-schema/custom-widgetregistry";
import { WaveComponent } from "ng2-spin-kit";
import { ListProductEntryComponent } from "./list-product-entry/list-product-entry.component";
import { DaterangepickerConfig } from "ng2-daterangepicker";
import { DATEPICKER_CONFIG } from "../shared/datepicker.config";
import { SharedModule } from "../shared/shared.module";
import { AddProductEntryComponent } from "./add-product-entry/add-product-entry.component";
import { SelectModule } from 'ng2-select';
import { ModalModule } from "angular2-modal";
import { BootstrapModalModule } from "angular2-modal/plugins/bootstrap";
import { AddProductOutComponent } from './add-product-out/add-product-out.component';
// import { Select2Module } from 'ng2-select2';
import { DatepickerModule } from "ngx-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    SchemaFormModule,
    StockRoutingModule,
    SharedModule,
    SelectModule,
    ModalModule.forRoot(),
    BootstrapModalModule,
    // Select2Module,
    DatepickerModule.forRoot()
  ],
  declarations: [
    StockProductsComponent,
    MenuComponent,
    WaveComponent,
    AddProductsComponent,
    ListProductEntryComponent,
    AddProductEntryComponent,
    AddProductOutComponent
  ],
  exports: [
    StockProductsComponent,
    AddProductsComponent,
    AddProductEntryComponent,
    AddProductOutComponent
  ],
  providers: [
    {provide: WidgetRegistry, useClass: CustomWidgetRegistry},
    ProductsService
  ]
})
export class StockModule {
  constructor(private daterangepickerOptions: DaterangepickerConfig) {
    this.daterangepickerOptions.settings = DATEPICKER_CONFIG;
  }
}