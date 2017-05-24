import { LoadingView } from "./base-loading-view";
import { Injector, OnDestroy, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IServerResponseList } from "./interfaces/server-response";
import { Utils } from "./utils";
import { APIGetParams } from "./interfaces/http-services.interface";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { isEmpty } from "../utils";

export class BaseListView<T> extends LoadingView implements OnInit, OnDestroy {

  items: any[];
  total = 0;
  private requestSub: Subscription;
  private addedQueryParams = [];

  protected enableDateFilter = true;

  params: APIGetParams = {
    page_size: 10,
    page: 1,
    disable_date_filter: false
  };

  constructor(protected route: ActivatedRoute) {
    super();
  }

  setQueryParams(params: string[]) {
    this.addedQueryParams = params;
  }

  ngOnInit() {
    console.log('this.addedQueryParams');
    console.log(this.addedQueryParams);
    if (isEmpty(this.addedQueryParams)) {
      this.makeRequest();
    } else {
      this.route.queryParams.subscribe(
        (params: Params) => {
          let requestParams = {};
          for (let param in params) {
            if (this.addedQueryParams.indexOf(param) !== -1) {
              requestParams[param] = params[param];
            }
          }
          Object.assign(this.params, requestParams);
          this.makeRequest();
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.requestSub) {
      this.requestSub.unsubscribe();
    }
  }

  disableDateFilter() {
    this.enableDateFilter = false;
  }

  sortColumn(params) {
    Object.assign(this.params, params);
    this.makeRequest();
  }

  pageChanged(event: number) {
    this.params.page = event;
    this.makeRequest();
  }

  request(): Observable<IServerResponseList<T>> {
    console.log('request');
    return null;
  }

  makeRequest() {
    this.setLoading(true);
    if (this.enableDateFilter == false) {
      delete this.params.end_date;
      delete this.params.start_date;
      this.params.disable_date_filter = true;
    }
    this.requestSub = this.request().subscribe(
      (response: IServerResponseList<any>) => {
        this.items = <any[]> response.results;
        this.total = response.count;
      },
      () => {
        this.setLoading(false);
      },
      () => this.setLoading(false)
    );
  }

  selectedDate(value: any) {
    if (value.start) {
      this.params.start_date = Utils.formatDateUrl(value.start);
    }
    if (value.end) {
      this.params.end_date = Utils.formatDateUrl(value.end);
    }
    this.makeRequest();
  }

  search() {
    this.makeRequest();
  }

}