import { NgModule, LOCALE_ID } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { AppComponent } from "./app.component";
import { DropdownModule } from "ng2-bootstrap/dropdown";
import { TabsModule } from "ng2-bootstrap/tabs";
import { NAV_DROPDOWN_DIRECTIVES } from "./shared/nav-dropdown.directive";
import { ChartsModule } from "ng2-charts/ng2-charts";
import { SIDEBAR_TOGGLE_DIRECTIVES } from "./shared/sidebar.directive";
import { AsideToggleDirective } from "./shared/aside.directive";
import { BreadcrumbsComponent } from "./shared/breadcrumb.component";
// Routing Module
import { AppRoutingModule } from "./app.routing";
//Layouts
import { FullLayoutComponent } from "./layouts/full-layout.component";
import { SimpleLayoutComponent } from "./layouts/simple-layout.component";
import { AuthGuard } from "./auth/auth-guard.service";
import { AuthService } from "./auth/auth.service";
import { HttpModule } from "@angular/http";
import { AuthModule } from "./auth/auth.module";
import { Logger, ConsoleLogService } from "./shared/logger";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { Ng2PaginationModule } from "ng2-pagination";
import { StockModule } from "./stock/stock.module";
import { PipeModule } from "./shared/pipe/pipe.module";
import { SchemaFormModule, WidgetRegistry } from "angular2-schema-form/src";
import { CustomWidgetRegistry } from "./shared/form-schema/custom-widgetregistry";
import { ReactiveFormsModule } from "@angular/forms";
import { ToasterModule } from "angular2-toaster";
import { CooperativeModule } from "./cooperative/cooperative.module";
import { AppLocale } from "./shared/locale";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    AuthModule,
    Ng2SmartTableModule,
    Ng2PaginationModule,
    PipeModule,
    SchemaFormModule,
    StockModule,
    CooperativeModule,
    ToasterModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    {
      provide: Logger,
      useClass: ConsoleLogService
    },
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {provide: WidgetRegistry, useClass: CustomWidgetRegistry},
    AuthGuard,
    AuthService,
    AppLocale
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
