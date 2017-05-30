import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductConsignment } from './add-product-consignment';

describe('AddProductConsignment', () => {
  let component: AddProductConsignment;
  let fixture: ComponentFixture<AddProductConsignment>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductConsignment ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductConsignment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
