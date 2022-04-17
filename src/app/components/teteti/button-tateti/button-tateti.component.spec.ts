import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTatetiComponent } from './button-tateti.component';

describe('ButtonTatetiComponent', () => {
  let component: ButtonTatetiComponent;
  let fixture: ComponentFixture<ButtonTatetiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonTatetiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonTatetiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
