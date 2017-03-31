import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Product } from "../stock.models";
import { ProductsService } from "../products.service";
import { LoadingView } from "../../shared/base-loading-view";
import { Utils } from "../../shared/utils";
import { Router, ActivatedRoute } from "@angular/router";
import { ToasterService } from "angular2-toaster";
import { IServerResponseIdName } from "../../shared/interfaces/server-response";
import { Observable } from "rxjs";

@Component({
  templateUrl: 'add-products.component.html'
})
export class AddProductsComponent extends LoadingView implements OnInit, OnDestroy {

  form: FormGroup;
  categoryList: Array<IServerResponseIdName>;
  routeSub: any;
  productId: number;

  constructor(private fb: FormBuilder,
              private productsService: ProductsService,
              private router: Router,
              private currentRoute: ActivatedRoute,
              private toasterService: ToasterService) {
    super();
    this.form = this.fb.group({
      name: null,
      price: null,
      category: null,
      is_for_sale: false,
      observation: null,
      has_consignment: false
    })
  }

  ngOnInit() {
    this.setLoading(true);

    this.routeSub = this.currentRoute.params.subscribe(params => {
      this.productId = params['id'];
      if (!this.productId) {
        this.setLoading(false);
      } else {
        this.productsService.getProduct(this.productId).subscribe(
          (response: Product) => {
            this.form.patchValue(response);
            this.setLoading(false);
          }
        )
      }
    });

    this.setLoadingItem('categories', true);
    this.productsService.getCategories().subscribe(
      (response: Array<IServerResponseIdName>) => {
        this.categoryList = response;
        this.setLoadingItem('categories', false);
      },
      () => this.setLoadingItem('categories', false),
      () => this.setLoadingItem('categories', false)
    );
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  submit(model: Product, valid: boolean, continueEditing: boolean) {
    if (!valid) {
      return;
    }
    this.setLoading(true);
    let request: Observable<Product>;
    if (this.productId) {
      request = this.productsService.update(this.productId, model);
    } else {
      request = this.productsService.create(model);
    }
    request.subscribe(
      () => {
        if (this.productId) {
          this.toasterService.pop('success', 'Produto editado com sucesso');
        } else {
          this.toasterService.pop('success', 'Produto adicionado com sucesso');
        }
        if (!continueEditing) {
          this.router.navigate(['/estoque/produtos']);
        }
      },
      (errors: Object) => {
        Utils.setFormErrors(this.form, errors);
        this.setLoading(false);
      },
      () => this.setLoading(false)
    )
  }

}
