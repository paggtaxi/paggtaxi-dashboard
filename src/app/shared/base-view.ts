import { OnInit } from "@angular/core";

abstract class AbstractBaseView {
  abstract setError(loading: boolean);

  abstract hasError(): boolean;
}

export class BaseView implements AbstractBaseView, OnInit {

  private error = false;
  private errorItems = {};

  setError(error: boolean, errorId?: string) {
    if (errorId) {
      return this.setErrorItem(errorId, error);
    }
    this.error = error;
  }

  ngOnInit(): void {
    this.error = false;
    this.errorItems = {};
  }

  hasError(errorId?: string) {
    if (errorId) {
      return this.hasErrorItem(errorId);
    }
    return this.error;
  }

  private hasErrorItem(errorId: string) {
    if (!this.errorItems.hasOwnProperty(errorId)) {
      return false;
    }
    return this.errorItems[errorId];
  }

  private setErrorItem(errorId: string, error: boolean) {
    this.errorItems[errorId] = error;
  }
}