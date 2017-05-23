import { FormGroup } from "@angular/forms";
import * as moment from "moment";
import { Moment } from "moment";

export class Utils {

  static setFormErrors(form: FormGroup, errors: Object) {
    for (let field of Object.keys(errors)) {
      if (field === 'non_field_errors') {
        form.setErrors(errors[field]);
      } else {
        form.controls[field].setErrors(errors[field]);

      }
    }
  }

  static formatDateUrl(dateMoment: any) {
    if (dateMoment) {
      return dateMoment.format('DD-MM-YYYY');
    }
  }

  static formatDateBody(dateMoment: Moment | Date) {
    if (dateMoment) {
      if (dateMoment instanceof Date) {
        dateMoment = moment(dateMoment);
      }
      return dateMoment.format('YYYY-MM-DD');
    }
  }

  static addParamUrl(key: string, value: any) {
    key = encodeURI(key);
    value = encodeURI(value);

    let kvp = document.location.search.substr(1).split('&');
    let i = kvp.length;
    let x;

    while (i--) {
      x = kvp[i].split('=');

      if (x[0] === key) {
        x[1] = value;
        kvp[i] = x.join('=');
        break;
      }
    }

    if (i < 0) {
      kvp[kvp.length] = [key, value].join('=');
    }

    //this will reload the page, it's likely better to store this until finished
    document.location.search = kvp.join('&');
  };

  static isObjEmpty(obj: Object) {
    return Object.keys(obj).length === 0;
  }

}