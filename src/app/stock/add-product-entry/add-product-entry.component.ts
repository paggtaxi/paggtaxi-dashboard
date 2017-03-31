import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Product } from "../stock.models";
import { ProductsService } from "../products.service";
import { LoadingView } from "../../shared/base-loading-view";
import { Utils } from "../../shared/utils";
import { Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import { INgSelectData, IServerResponseList } from "../../shared/interfaces/server-response";
import { Observable } from "rxjs";
import setPrototypeOf = Reflect.setPrototypeOf;
import { AppSettings } from "../../app-settings";
import { AuthService } from "../../auth/auth.service";
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { Overlay } from 'angular2-modal';

@Component({
  templateUrl: 'add-product-entry.component.html'
})
export class AddProductEntryComponent extends LoadingView implements OnInit {

  form: FormGroup;
  productList: Array<INgSelectData> = [];
  countInputs = 1;
  INPUT_LIMIT = 30;

  constructor(private fb: FormBuilder,
              private productsService: ProductsService,
              private router: Router,
              private auth: AuthService,
              public modal: Modal,
              private overlay: Overlay,
              private vcRef: ViewContainerRef,
              private toasterService: ToasterService) {
    super();
    overlay.defaultViewContainer = vcRef;
    this.form = this.fb.group({
      product_id: null,
      item_id_1: null
    })
  }

  ngOnInit() {
    this.getProductSelectItems();
  }

  setProductList(products: Product[]) {
    this.productList = products.map((value: Product) => {
      return {id: value.id, text: value.name}
    });
  }

  submit(data: any) {
    this.setLoading(true);
    let request: Observable<Product>;
    let item_id = [];
    for (let item of Object.keys(data)) {
      if (item.indexOf('item_id') !== -1) {
        item_id.push(data[item]);
      }
    }
    console.log(item_id);
    request = this.productsService.createEntry({
      product: data.product_id,
      item_id: item_id
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

  selectedProductSelect(value: INgSelectData) {
    this.form.controls['product_id'].setValue(value.id);
  }

  getProductSelectItems() {
    this.setLoadingItem('products', true);
    this.productsService.getProducts(AppSettings.LARGE_PAGE_RESULTS).subscribe(
      (response: IServerResponseList) => {
        this.setProductList(<Product[]>response.results);
        this.setLoadingItem('products', false);
      },
      () => this.setLoadingItem('products', false),
      () => this.setLoadingItem('products', false)
    );
  }

  createRange(number) {
    let items: number[] = [];
    for (let i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  cancelAndChangeProduct() {
    this.modal.confirm()
      .title("Confirmar")
      .body("Ao alterar o produto você perderá as informações ainda não salvas, deseja continuar?")
      .okBtn("Sim")
      .cancelBtn("Não")
      .open()
      .catch(() => {
      }) // catch error not related to the result (modal open...)
      .then((dialog: any) => dialog.result) // dialog has more properties,lets just return the promise for a result.
      .then(() => {
        this.form.controls['product_id'].setValue(null);
        this.countInputs = 1;
      })
      .catch(() => {
      }) // if were here it was cancelled (click or non block click) // if were here ok was clicked.
  }

  addInput($event) {
    if ($($event.target).data('itemid') === this.countInputs && this.countInputs < this.INPUT_LIMIT) {
      this.countInputs++;
      this.form.addControl(`item_id_${this.countInputs}`, new FormControl('', null));
    }
  }
}
