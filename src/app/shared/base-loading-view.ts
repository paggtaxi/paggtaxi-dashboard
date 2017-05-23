import { OnInit } from "@angular/core";
import { BaseView } from "./base-view";
abstract class AbstractLoadingView {

  abstract setLoading(loading: boolean);

  // abstract setLoadingItem(loadingId: string, loading: boolean);

  abstract isLoading(): boolean;

  // abstract isLoadingItem(loadingId: string): boolean;
}

export class LoadingView extends BaseView implements AbstractLoadingView, OnInit {
  private loading = false;
  private loadingItems = {};

  ngOnInit(): void {
    this.setLoading(false);
  }

  setLoading(loadingId?: boolean | string, loading?: boolean) {
    if (typeof loadingId == "boolean") {
      this.loading = loadingId;
      return;
    } else if (typeof loadingId == "string" && typeof loading == "boolean") {
      return this.setLoadingItem(loadingId, loading);
    } else {
      throw new Error("setLoading params must be (loading: boolean) or (loadingId: string, loading: boolean).");
    }
  }

  private setLoadingItem(loadingId: string, loading: boolean) {
    this.loadingItems[loadingId] = loading;
  }

  isLoading(loadingId?: string) {
    if (loadingId) {
      if ((typeof loadingId != 'string')) {
        throw new Error("loadingId param must be a string instance.");
      }
      return this.isLoadingItem(loadingId);
    }
    return this.loading;
  }

  private isLoadingItem(loadingId: string) {
    if (!this.loadingItems.hasOwnProperty(loadingId)) {
      // throw new Error("Before check if a item is loading ensure than start loading.")
      return false;
    }
    return this.loadingItems[loadingId];
  }

}