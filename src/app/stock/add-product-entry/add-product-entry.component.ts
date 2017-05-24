import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Product } from "../stock.models";
import { ProductsService } from "../products.service";
import { LoadingView } from "../../shared/base-loading-view";
import { Utils } from "../../shared/utils";
import { Router } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import { INgSelectData } from "../../shared/interfaces/server-response";
import { Observable } from "rxjs";
import { AppSettings } from "../../app-settings";
import { AuthService } from "../../auth/auth.service";
import { Modal } from "angular2-modal/plugins/bootstrap";
import { Overlay } from "angular2-modal";
import setPrototypeOf = Reflect.setPrototypeOf;

@Component({
  templateUrl: 'add-product-entry.component.html'
})
export class AddProductEntryComponent extends LoadingView implements OnInit {

  form: FormGroup;
  submitted = false;
  productList: Array<INgSelectData> = [];
  countInputs = 0;
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
    this.setForm();
  }

  setForm() {
    this.form = this.fb.group({
      product_id: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.getProductSelectItems();
    this.addInput();
  }

  setProductList(products: Product[]) {
    this.productList = products.map((value: Product) => {
      return {id: value.id, text: value.name}
    });
  }

  submit(data: any, valid: boolean) {
    this.submitted = true;
    if (!valid) {
      return;
    }
    this.setLoading(true);
    let request: Observable<Product>;
    let items = [];
    for (let item of Object.keys(data)) {
      if (item.indexOf('item_id') !== -1) {
        items.push({item_id: data[item], amount: data['amount_' + item.split('_').pop()]});
      }
    }
    console.log(items);
    request = this.productsService.createEntry({
      product: data.product_id,
      items: items
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
    this.setLoading('products', true);
    this.productsService.getProducts(AppSettings.LARGE_PAGE_RESULTS).subscribe(
      (response) => {
        this.setProductList(response.results);
        this.setLoading('products', false);
      },
      () => this.setLoading('products', false),
      () => this.setLoading('products', false)
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
        this.clearForm();
      })
      .catch(() => {
      }) // if were here it was cancelled (click or non block click) // if were here ok was clicked.
  }

  clearForm() {
    this.countInputs = 1;
    this.setForm();
  }

  addInputEvent($event) {
    if ($($event.target).data('itemid') === this.countInputs && this.countInputs < this.INPUT_LIMIT) {
      this.addInput();
    }
  }

  addInput() {
    this.countInputs++;
    this.form.addControl(`item_id_${this.countInputs}`, new FormControl(''));
    this.form.addControl(`amount_${this.countInputs}`, new FormControl(1, [Validators.pattern(`[0-9]*`)]));
  }
}
