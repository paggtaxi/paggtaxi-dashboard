import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProductEntryComponent } from './list-product-entry.component';

describe('ListProductEntryComponent', () => {
  let component: ListProductEntryComponent;
  let fixture: ComponentFixture<ListProductEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProductEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
