import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Product, ProductItem } from "../stock.models";
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
import { createRange } from "../../utils";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-add-product-out',
  templateUrl: './add-product-out.component.html',
  styleUrls: ['./add-product-out.component.scss']
})
export class AddProductOutComponent extends LoadingView implements OnInit {

  form: FormGroup;
  // productList: Array<INgSelectData> = [];
  driverList: Array<INgSelectData> = [];
  submitted = false;
  datePickerLocale: any;
  datePickerFormat: string;

  limitAmount;
  limitInstallment = 12;
  currentProduct: any;

  public initialBillingDate = moment().toDate();
  public maxDtInitialBillingDate = moment().add(7, 'days').toDate();
  public minDtInitialBillingDate = moment().toDate();
  public dt = new Date();
  public maxDt = moment().toDate();

  lastValueItemId;

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
      amount: new FormControl('', [Validators.required]),

      installment: new FormControl(1),
      initial_billing_date: new FormControl(''),
      billing_next_monday: new FormControl(false)
    })
  }

  ngOnInit() {
    this.setItemIdInputListeners();
    this.getDriversSelectItems();
    // this.form.controls['product_id'].valueChanges.subscribe(
    //   (newValue) => {
    //     if (newValue) {
    //       this.onSelectProduct(newValue);
    //     }
    //   }
    // );
    this.form.controls['billing_next_monday'].valueChanges.subscribe(
      (newValue) => {
        if (newValue) {
          if (newValue === true) {
            this.initialBillingDate = null;
          } else {
            this.initialBillingDate = moment().toDate();
          }
        }
      }
    );
  }

  // onSelectProductSub: Subscription;

  // onSelectProduct(productId: number) {
  //   if (this.onSelectProductSub) {
  //     this.onSelectProductSub.unsubscribe();
  //   }
  //   this.onSelectProductSub = this.productsService.getProduct(productId).subscribe(
  //     (product) => {
  //       this.currentProduct = product;
  //       this.setAmountList(product.amount);
  //     }
  //   )
  // }

  setAmountList(amount: number) {
    this.limitAmount = amount;
    if (amount && amount > 0) {
      this.form.controls['amount'].setValue('1');
    } else {
      this.form.controls['amount'].setValue(null);
    }
  }

  setProductItem(productItem: ProductItem) {
    if (!productItem) {
      this.reset();
      return;
    }
    this.setAmountList(productItem.amount);
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
    console.log(valid);
    this.submitted = true;
    if (!valid && !this.lastErrorFromServer && !this.isLoadingAny()) {
      return;
    }
    this.setLoading(true);
    let request: Observable<Product>;
    request = this.productsService.createOutput({
      product: this.form.controls['product_id'].value,
      item_id: data.item_id,
      driver_id: this.form.controls['driver_id'].value,
      amount: this.form.controls['amount'].value,
      installment: this.form.controls['installment'].value,
      billing_next_monday: this.form.controls['billing_next_monday'].value,
      date_output: this.dt,
      initial_billing_date: this.initialBillingDate
    });
    request.subscribe(
      () => {
        this.toasterService.pop('success', 'Entrada de produto realizada com sucesso');
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

  _createRange(number) {
    return createRange(number);
  }

  selectedProduct(value: ISelect2SelectedData) {
    // this.initValue = value.value;
    this.form.controls['product_id'].setValue(value.value);
  }

  selectedDriver(value: ISelect2SelectedData) {
    this.form.controls['driver_id'].setValue(value.value);
  }

  getProductItemByItemId(item_id) {
    this.setLoading('products', true);
    this.productsService.getProductItems({item_id: item_id}).subscribe(
      (response) => {
        this.setProductItem(response.results[0]);
        this.setLoading('products', false);
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

  private setItemIdInputListeners() {
    this.form.controls['item_id'].valueChanges
      .subscribe(
        (newValue) => {
          if (newValue) {
            this.setLoading('products', true);
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
              this.getProductItemByItemId(newValue);
            }
          }
        }
      )
  }

  reset() {
    this.currentProduct = null;
    this.selectedProduct({value: null});
    this.setAmountList(null);
    this.form.reset();
    if (this.lastValueItemId) {
      this.form.controls['item_id'].setValue(this.lastValueItemId);
    }
  }

  buyData() {
    if (!this.currentProduct) {
      return {}
    }
    let installments = this.form.controls['installment'].value || 1;
    let amount = this.form.controls['amount'].value || 0;
    let total = parseFloat(this.currentProduct.price) * amount;
    return {
      unitPrice: this.currentProduct.price,
      total: total,
      parcelPrice: total / installments,
    }
  }

}
