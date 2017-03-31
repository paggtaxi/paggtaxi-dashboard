import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductOutComponent } from './add-product-out.component';

describe('AddProductOutComponent', () => {
  let component: AddProductOutComponent;
  let fixture: ComponentFixture<AddProductOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
