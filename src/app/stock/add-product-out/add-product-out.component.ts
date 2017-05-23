import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Product } from "../stock.models";
import { ProductsService } from "../products.service";
import { LoadingView } from "../../shared/base-loading-view";
import { Utils } from "../../shared/utils";
import { Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import { INgSelectData, ISelect2SelectedData, IServerResponseList } from "../../shared/interfaces/server-response";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { Overlay } from "angular2-modal";
import { TaxiDriver } from "../../shared/models/taxi-driver.model";
import { CooperativeService } from "../../cooperative/cooperative.service";
import { AppSettings } from "../../app-settings";

import * as moment from "moment";
import { AppLocale } from "../../shared/locale";

@Component({
  selector: 'app-add-product-out',
  templateUrl: './add-product-out.component.html',
  styleUrls: ['./add-product-out.component.scss']
})
export class AddProductOutComponent extends LoadingView implements OnInit {

  form: FormGroup;
  productList: Array<INgSelectData> = [];
  driverList: Array<INgSelectData> = [];

  datePickerLocale: any;
  datePickerFormat: string;

  public dt = new Date();
  public maxDt = moment().add(1, 'day').toDate();

  constructor(private fb: FormBuilder,
              private productsService: ProductsService,
              private router: Router,
              private auth: AuthService,
              public modal: Modal,
              private overlay: Overlay,
              private coopService: CooperativeService,
              private vcRef: ViewContainerRef,
              private appLocale: AppLocale,
              private toasterService: ToasterService) {
    super();
    this.datePickerLocale = this.appLocale.getCalendarLocale();
    this.datePickerFormat = this.appLocale.getDatePickerFormat();
    overlay.defaultViewContainer = vcRef;
    this.form = this.fb.group({
      product_id: null,
      item_id: null,
      driver_id: null
    })
  }

  ngOnInit() {
    this.setItemIdInputListeners();
    this.getDriversSelectItems();
  }

  setProductList(products: Product[]) {
    this.productList = products.map((value: Product) => {
      return {id: value.id, text: value.name}
    });
    if (!Utils.isObjEmpty(this.productList)) {
      this.selectedProduct({value: this.productList[0].id});
    }
  }

  setDriverList(drivers: TaxiDriver[]) {
    this.driverList = drivers.map((value: TaxiDriver) => {
      return {id: value.id, text: value.prefixo}
    });
  }

  submit(data: any) {
    this.setLoading(true);
    let request: Observable<Product>;
    request = this.productsService.createOutput({
      product: this.form.controls['product_id'].value,
      item_id: data.item_id,
      driver_id: this.form.controls['driver_id'].value,
      date_output: this.dt
    });
    request.subscribe(
      () => {
        this.toasterService.pop('success', 'Entrada de produto realizada com sucesso');
        this.router.navigate(['/estoque/entradas-produtos']);
      },
      (errors: Object) => {
        Utils.setFormErrors(this.form, errors);
        this.setLoading(false);
      },
      () => this.setLoading(false)
    )
  }

  selectedProduct(value: ISelect2SelectedData) {
    // this.initValue = value.value;
    this.form.controls['product_id'].setValue(value.value);
  }

  selectedDriver(value: ISelect2SelectedData) {
    this.form.controls['driver_id'].setValue(value.value);
  }

  getProductSelectItems(item_id) {
    this.setLoading('products', true);
    this.productsService.getProducts({item_id: item_id}).subscribe(
      (response: IServerResponseList) => {
        this.setProductList(<Product[]>response.results);
        this.setLoading('products', false);
      },
      () => this.setLoading('products', false),
      () => this.setLoading('products', false)
    );
  }

  getDriversSelectItems() {
    this.setLoading('drivers', true);
    this.coopService.getDrivers(AppSettings.LARGE_PAGE_RESULTS).subscribe(
      (response: IServerResponseList) => {
        this.setDriverList(<TaxiDriver[]>response.results);
        this.setLoading('drivers', false);
      },
      () => this.setLoading('drivers', false),
      () => this.setLoading('drivers', false)
    );
  }

  private setItemIdInputListeners() {
    this.form.controls['item_id'].valueChanges
      .subscribe(
        (newValue) => {
          if (newValue) {
            this.setLoading('products', true);
            this.productList = [];
            this.form.controls['product_id'].setValue('');
          } else {
            this.setLoading('products', false);
          }
        }
      );
    this.form.controls['item_id'].valueChanges
      .debounceTime(1000)
      .subscribe(
        (newValue) => {
          if (newValue) {
            this.getProductSelectItems(newValue);
          }
        }
      )
  }

}
