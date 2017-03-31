import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {

  @Input()
  dateModel: Date;
  @Input()
  label: string;
  @Output()
  dateModelChange: EventEmitter<string> = new EventEmitter();
  showDatepicker: boolean = false;

  showPopup() {
    console.log('showPopup');
    this.showDatepicker = true;
  }

  hidePopup(event) {
    console.log('hidePopup');
    // this.showDatepicker = false;
    // this.dateModel = event;
    // this.dateModelChange.emit(event)
  }

}
