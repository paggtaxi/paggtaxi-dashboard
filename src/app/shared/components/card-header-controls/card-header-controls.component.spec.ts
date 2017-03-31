import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardHeaderControlsComponent } from './card-header-controls.component';

describe('CardHeaderControlsComponent', () => {
  let component: CardHeaderControlsComponent;
  let fixture: ComponentFixture<CardHeaderControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardHeaderControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardHeaderControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
