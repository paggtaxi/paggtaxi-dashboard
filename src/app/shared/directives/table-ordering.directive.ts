import { Directive, HostListener, ElementRef, AfterViewChecked, Input, Output, EventEmitter } from '@angular/core';

declare let $: JQueryStatic;

@Directive({
  selector: '[tableOrdering]',
})
export class TableOrderingDirective implements AfterViewChecked {

  ngAfterViewChecked(): void {
    $(this.el.nativeElement).find('th[data-column]').addClass('sort-column-command');
  }

  $el: JQuery;

  @Output() sortColumn: EventEmitter<any> = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  @HostListener('click', ['$event']) onClick($event: any) {
    this.$el = $($event.target);
    if (this.$el.attr('data-column')) {
      this.toggleColumn();
    }
  }

  getNewShortOrder() {
    let currentOrder = this.$el.attr('data-sort');
    let primaryOrder = 'desc';
    let secondaryOrder = 'asc';
    if (currentOrder) {
      if (currentOrder == secondaryOrder) {
        return;
      }
      return currentOrder == primaryOrder ? secondaryOrder : primaryOrder;
    }
    return primaryOrder;
  }

  toggleColumn() {
    let newSortOrder = this.getNewShortOrder();
    let tableEl = this.$el.closest('table');

    tableEl.find('.sort-column-command.active').removeClass('active')
      .removeClass('order-desc')
      .removeClass('order-asc')
      .removeClass('active')
      .attr('data-sort', '');

    this.$el.addClass('sort-column-command').addClass('active');

    this.$el.attr('data-sort', newSortOrder);

    switch (newSortOrder) {
      case 'desc':
        this.$el.addClass('order-asc');
        this.$el.removeClass('order-desc');
        break;
      case 'asc':
        this.$el.addClass('order-desc');
        this.$el.removeClass('order-asc');
        break;
      default:
        this.$el.removeClass('order-desc');
        this.$el.removeClass('order-asc');
        this.$el.removeClass('active');
        this.$el.attr('data-sort', '');
        break;
    }
    this.sortColumn.emit(this.toParam())
  }

  toParam(): Object {
    let elems = this.$el.closest('table').find('.sort-column-command.active');
    let ordering = [];
    elems.each(function () {
      let prefix = $(this).attr('data-sort') == 'desc' ? '-' : '';
      let key = $(this).data('column');
      ordering.push(`${prefix}${key}`);
    });
    if (!ordering.length) {
      return '';
    }
    return {'ordering': ordering.join(',')};
  }
}
