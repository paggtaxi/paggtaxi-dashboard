import { Pipe, PipeTransform } from '@angular/core';

export let PIPE_NAME = 'booleanImg';

@Pipe({
  name: PIPE_NAME
})
export class BooleanImgPipe implements PipeTransform {
  constructor() {
  }

  transform(value: any, args?: any): any {
    if (value && typeof value !== 'boolean') {
      throw `Invalid type '${typeof value}' for ${PIPE_NAME} pipe, must be a 'boolean'.`
    }
    if (value) {
      return '<i class="fa fa-circle text-success"></i>';
    } else {
      return '<i class="fa fa-circle text-danger"></i>';
    }
  }

}
