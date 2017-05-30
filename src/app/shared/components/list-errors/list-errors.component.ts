import { Component, Input } from "@angular/core";
import { Errors } from "../../models/errors.model";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs/Subscription";
import { isDefined } from "../../../utils";

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss']
})

export class ListErrorsComponent {

  _errors: Array<string> = [];
  lastAsyncPopulateErrorList: Subscription;

  constructor(private trans: TranslateService) {
  }

  static errorToTranslateKey(error: string) {
    switch (error) {
      case 'required':
        return 'FORMS_ERRORS.REQUIRED';
      default:
        return 'FORMS_ERRORS.INVALID';
    }
  }

  asyncPopulateErrorList(errorList: Errors | Array<string>) {
    if (isDefined(this.lastAsyncPopulateErrorList)) {
      this.lastAsyncPopulateErrorList.unsubscribe();
    }
    let errors = [];
    for (let error in errorList) {
      errors.push(ListErrorsComponent.errorToTranslateKey(error));
    }
    this.lastAsyncPopulateErrorList = this.trans.get(errors).subscribe(
      (res: Object) => {
        let errors = [];
        for (let error in res) {
          errors.push(res[error]);
        }
        this._errors = errors;
      },
      (e) => console.error(e)
    )
  }

  @Input()
  set errors(errorList: any) {
    this._errors = [];
    if (errorList instanceof Array) {
      this._errors = errorList;
      return;
    }
    if (errorList instanceof Object) {
      if (errorList.errors) {
        let errors = [];
        for (let field in errorList.errors) {
          if (errorList.errors.hasOwnProperty(field)) {
            errors.push(`${field} ${errorList.errors[field]}`);
          }
        }
        this._errors = errors;
        return;
      }
      this.asyncPopulateErrorList(errorList);
    }
  };

  get errorList() {
    return this._errors;
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    if (this.lastAsyncPopulateErrorList) {
      this.lastAsyncPopulateErrorList.unsubscribe();
    }
  }
}
