import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss']
})
export class DatepickerRangeComponent implements OnInit {

  @Input() selectedDate : Function;
  @Input('options') dtOptions: {};

  constructor() { }

  ngOnInit() {
  }

}
