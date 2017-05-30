import { isDevMode, LOCALE_ID, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { AppComponent } from "./app.component";
import { BsDropdownModule } from "ngx-bootstrap";
import { TabsModule } from "ngx-bootstrap/tabs";
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
import { Http, HttpModule } from "@angular/http";
import { AuthModule } from "./auth/auth.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgxPaginationModule } from "ngx-pagination";
import { StockModule } from "./stock/stock.module";
import { PipeModule } from "./shared/pipe/pipe.module";
import { SchemaFormModule, WidgetRegistry } from "angular2-schema-form";
import { CustomWidgetRegistry } from "./shared/form-schema/custom-widgetregistry";
import { ReactiveFormsModule } from "@angular/forms";
import { ToasterModule } from "angular2-toaster";
import { CooperativeModule } from "./cooperative/cooperative.module";
import { AppLocale } from "./shared/locale";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { Level, NgLoggerModule } from "@nsalaun/ng-logger";
import { AuthenticatedHttpService } from "app/shared/http-interceptor";
import { p404Component } from "./shared/components/error-pages/404.component";
import { p500Component } from "app/shared/components/error-pages/500.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

const LOG_LEVEL = Level.DEBUG;

if (!isDevMode()) {
  const LOG_LEVEL = Level.ERROR;
}

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    BrowserAnimationsModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpModule,
    AuthModule,
    Ng2SmartTableModule,
    NgxPaginationModule,
    PipeModule,
    SchemaFormModule,
    StockModule,
    CooperativeModule,
    ToasterModule,
    ReactiveFormsModule,
    NgLoggerModule.forRoot(LOG_LEVEL)
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    p404Component,
    p500Component,
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
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {provide: WidgetRegistry, useClass: CustomWidgetRegistry},
    AuthGuard,
    AuthService,
    AppLocale,
    {
      provide: Http,
      useClass: AuthenticatedHttpService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
