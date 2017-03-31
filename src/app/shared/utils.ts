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

}