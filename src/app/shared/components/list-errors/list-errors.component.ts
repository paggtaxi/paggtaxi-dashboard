import { Component, Input } from "@angular/core";
import { Errors } from "../../models/errors.model";

@Component({
  selector: 'list-errors',
  templateUrl: './list-errors.component.html',
  styleUrls: ['./list-errors.component.scss']
})

export class ListErrorsComponent {

  formattedErrors: Array<string> = [];

  @Input()
  set errors(errorList: Errors|Array<string>) {
    this.formattedErrors = [];
    if(!errorList){
      return;
    }
    if (errorList instanceof Array) {
      this.formattedErrors = errorList;
      return;
    }
    if (errorList.errors) {
      for (let field in errorList.errors) {
        this.formattedErrors.push(`${field} ${errorList.errors[field]}`);
      }
    }
  };

  get errorList() {
    return this.formattedErrors;
  }

}
