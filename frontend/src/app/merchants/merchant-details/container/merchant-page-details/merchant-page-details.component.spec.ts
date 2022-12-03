import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPageDetailsComponent } from './merchant-page-details.component';

describe('MerchantPageDetailsComponent', () => {
  let component: MerchantPageDetailsComponent;
  let fixture: ComponentFixture<MerchantPageDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPageDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantPageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
