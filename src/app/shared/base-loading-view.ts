import { OnInit } from "@angular/core";
import { BaseView } from "./base-view";
abstract class AbstractLoadingView {

  abstract setLoading(loading: boolean);

  abstract setLoadingItem(loadingId: string, loading: boolean);

  abstract isLoading(): boolean;

  abstract isLoadingItem(loadingId: string): boolean;
}

export class LoadingView extends BaseView implements AbstractLoadingView, OnInit {
  private loading = false;
  private loadingItems = {};

  setLoading(loading: boolean) {
    this.loading = loading;
  }

  ngOnInit(): void {
    this.setLoading(false);
  }

  setLoadingItem(loadingId: string, loading: boolean) {
    this.loadingItems[loadingId] = loading;
  }

  isLoading() {
    return this.loading;
  }

  isLoadingItem(loadingId: string) {
    if (!this.loadingItems.hasOwnProperty(loadingId)) {
      return false;
    }
    return this.loadingItems[loadingId];
  }

}