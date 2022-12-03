import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantDetailsComponent } from './merchant-details.component';

describe('MerchantDetailsComponent', () => {
  let component: MerchantDetailsComponent;
  let fixture: ComponentFixture<MerchantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
