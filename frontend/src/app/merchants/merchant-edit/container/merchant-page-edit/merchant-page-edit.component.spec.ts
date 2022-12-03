import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPageEditComponent } from './merchant-page-edit.component';

describe('MerchantPageEditComponent', () => {
  let component: MerchantPageEditComponent;
  let fixture: ComponentFixture<MerchantPageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantPageEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantPageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
