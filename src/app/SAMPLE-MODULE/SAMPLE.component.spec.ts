/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { SAMPLEComponent } from "./SAMPLE.component";


describe('SAMPLEComponent', () => {
  let component: SAMPLEComponent;
  let fixture: ComponentFixture<SAMPLEComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SAMPLEComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SAMPLEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
