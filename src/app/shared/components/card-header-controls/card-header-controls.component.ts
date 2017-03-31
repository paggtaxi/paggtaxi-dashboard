import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Utils } from "../../utils";
import * as moment from "moment";

@Component({
  selector: 'card-header-controls',
  templateUrl: './card-header-controls.component.html',
  styleUrls: ['./card-header-controls.component.scss']
})
export class CardHeaderControlsComponent implements OnInit {

  @Input() params: any;
  @Output() selectDate = new EventEmitter();
  @Output() runSearch = new EventEmitter();
  private isSelectDateUsed = false;
  private isRunSearchUsed = false;

  constructor() {
  }

  ngOnInit() {
    this.isSelectDateUsed = this.selectDate.observers.length > 0 && this.params;
    this.isRunSearchUsed = this.runSearch.observers.length > 0 && this.params;
    if (this.isSelectDateUsed) {
      this.params.start_date = Utils.formatDateUrl(moment().subtract(7, 'day'));
      this.params.end_date = Utils.formatDateUrl(moment());
    }
  }

  onselectDate($event) {
    this.selectDate.emit($event);
  }

  onrunSearch($event) {
    this.runSearch.emit($event);
  }

}
