import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantListPageComponent } from './merchant-list-page.component';

describe('MerchantListPageComponent', () => {
  let component: MerchantListPageComponent;
  let fixture: ComponentFixture<MerchantListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantListPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
