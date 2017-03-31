import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddProductEntryComponent } from "./add-product-entry.component";


describe('AddProductEntryComponent', () => {
  let component: AddProductEntryComponent;
  let fixture: ComponentFixture<AddProductEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
