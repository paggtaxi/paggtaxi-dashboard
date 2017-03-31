import { OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { IServerResponseList } from "../interfaces/server-response";
import { LoadingView } from "../base-loading-view";

export class PaginationView extends LoadingView implements OnInit {

  items: any[];
  total = 0;

  params: { page: number; page_size: number; };

  constructor() {
    super();
    this.params = {
      page_size: 10,
      page: 1
    }
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

}