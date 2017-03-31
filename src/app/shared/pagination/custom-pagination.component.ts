import { Component, ChangeDetectionStrategy, ViewEncapsulation } from "@angular/core";
import { PaginationControlsComponent } from "ng2-pagination";

@Component({
  selector: 'custom-pagination-controls',
  templateUrl: 'custom-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class CustomPaginationControlsComponent extends PaginationControlsComponent {
}