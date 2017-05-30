import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Product, ProductItem } from "../stock.models";
import { ProductsService } from "../products.service";
import { LoadingView } from "../../shared/base-loading-view";
import { Utils } from "../../shared/utils";
import { Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import { INgSelectData, ISelect2SelectedData } from "../../shared/interfaces/server-response";
import { Observable } from "rxjs";
import { AuthService } from "../../auth/auth.service";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { Overlay } from "angular2-modal";
import { TaxiDriver } from "../../shared/models/taxi-driver.model";
import { CooperativeService } from "../../cooperative/cooperative.service";
import { AppSettings } from "../../app-settings";

import * as moment from "moment";
import { AppLocale } from "../../shared/locale";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-add-product-out',
  templateUrl: './add-product-consignment.html',
  styleUrls: ['./add-product-consignment.scss']
})
export class AddProductConsignment extends LoadingView implements OnInit {

  form: FormGroup;
  productList: Array<INgSelectData> = [];
  driverList: Array<INgSelectData> = [];
  submitted = false;
  datePickerLocale: any;
  datePickerFormat: string;
  currentProduct: any;
  lastValueItemId;

  public dateReturn = new Date();
  public minDt = moment().toDate();

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
      product_id: new FormControl('', [Validators.required]),
      item_id: new FormControl('', [Validators.required]),
      driver_id: new FormControl('', [Validators.required]),
      date_return: new FormControl(''),
      observation: new FormControl('')
    })
  }

  currentProductId: number;

  ngOnInit() {

    this.form.controls['item_id'].valueChanges
      .subscribe(
        (newValue) => {
          if (newValue) {
            this.setLoading('products', true);
            this.productList = [];
            this.form.controls['product_id'].setValue(null);
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
            if (this.lastValueItemId !== newValue) {
              this.lastValueItemId = newValue;
              this.getProductSelectItems(newValue);
            }
          }
        }
      );

    this.getDriversSelectItems();

    this.form.controls['product_id'].valueChanges
      .subscribe(
        (newValue) => {
          if (newValue) {
            if (newValue !== this.currentProductId) {
              this.currentProductId = newValue;
              this.onSelectProduct(newValue);
            }
          }
        }
      );
  }

  setProductList(products: Product[]) {
    this.productList = products.map((value: Product) => {
      return {id: value.id, text: value.name}
    });
    if (!Utils.isObjEmpty(this.productList)) {
      this.selectedProduct({value: this.productList[0].id});
    } else {
      this.reset();
    }
  }

  getProductSelectItems(item_id) {
    this.setLoading('products', true);
    this.productsService.getProducts({item_id: item_id, is_active: true, has_consignment: true}).subscribe(
      (response) => {
        this.setProductList(response.results);
        this.setLoading('products', false);
      },
      () => this.setLoading('products', false),
      () => this.setLoading('products', false)
    );
  }

  onSelectProduct(productId: number) {
    this.getProductItem(this.form.controls['item_id'].value, productId);
  }

  setProductItem(productItem: ProductItem) {
    if (!productItem) {
      this.reset();
      return;
    }
    if (productItem.product) {
      this.currentProduct = productItem.product;
      this.selectedProduct({value: productItem.product.id});
    }
  }

  setDriverList(drivers: TaxiDriver[]) {
    this.driverList = drivers.map((value: TaxiDriver) => {
      return {id: value.id, text: value.prefixo}
    });
  }

  lastErrorFromServer = false;

  submit(data: any, valid: boolean) {
    this.submitted = true;
    if (!valid && !this.lastErrorFromServer && !this.isLoadingAny()) {
      return;
    }
    this.setLoading(true);
    let request: Observable<Product>;
    request = this.productsService.createConsignment({
        product: this.form.controls['product_id'].value,
        item_id: this.form.controls['item_id'].value,
        driver: this.form.controls['driver_id'].value,
        date_return: data.date_return,
        observation: this.form.controls['observation'].value
    });
    request.subscribe(
      () => {
        this.toasterService.pop('success', 'Comodato de produto realizada com sucesso');
        this.router.navigate(['/estoque/entradas-produtos']);
      },
      (errors: Object) => {
        Utils.setFormErrors(this.form, errors);
        this.lastErrorFromServer = true;
        this.setLoading(false);
      },
      () => this.setLoading(false)
    )
  }

  selectedProduct(value: ISelect2SelectedData) {
    this.form.controls['product_id'].setValue(value.value);
  }

  selectedDriver(value: ISelect2SelectedData) {
    this.form.controls['driver_id'].setValue(value.value);
  }

  getProductItemSub: Subscription;

  getProductItem(item_id: string, product_id: number) {
    // this.setLoading('products', true);
    if (this.getProductItemSub) {
      this.getProductItemSub.unsubscribe();
    }
    this.getProductItemSub = this.productsService.getProductItems({
      item_id: item_id,
      product_id: product_id
    }).subscribe(
      (response) => {
        this.setProductItem(response.results[0]);
      },
      () => this.setLoading('products', false),
      () => this.setLoading('products', false)
    );
  }

  getDriversSelectItems() {
    this.setLoading('drivers', true);
    this.coopService.getDrivers(AppSettings.LARGE_PAGE_RESULTS).subscribe(
      (response) => {
        this.setDriverList(response.results);
        this.setLoading('drivers', false);
      },
      () => this.setLoading('drivers', false),
      () => this.setLoading('drivers', false)
    );
  }

  reset() {
    this.currentProduct = null;
    this.selectedProduct({value: null});
    this.form.reset();
    if (this.lastValueItemId) {
      this.form.controls['item_id'].setValue(this.lastValueItemId);
    }
  }

  canShowBuyForm(): boolean {
    return !this.isLoadingAny() && !!this.currentProductId;
  }

}
