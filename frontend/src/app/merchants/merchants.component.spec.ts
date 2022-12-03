import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantsComponent } from './merchants.component';

describe('MerchantsComponent', () => {
  let component: MerchantsComponent;
  let fixture: ComponentFixture<MerchantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
