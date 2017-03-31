import { LoadingView } from "./base-loading-view";
import { OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IServerResponseList } from "./interfaces/server-response";
import { Utils } from "./utils";
import { APIGetParams } from "./interfaces/http-services.interface";

export class BaseListView extends LoadingView implements OnInit {

  items: any[];
  total = 0;

  params: APIGetParams = {
    page_size: 10,
    page: 1
  };

  constructor() {
    super();
  }

  ngOnInit() {
    this.getListItems();
  }

  sortColumn(params) {
    Object.assign(this.params, params);
    this.getListItems();
  }

  pageChanged(event: number) {
    this.params.page = event;
    this.getListItems();
  }

  request(): Observable<IServerResponseList> {
    console.log('request');
    return null;
  }

  getListItems() {
    this.setLoading(true);
    this.request().subscribe(
      (response: IServerResponseList) => {
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
    this.getListItems();
  }

  search() {
    this.getListItems();
  }

}