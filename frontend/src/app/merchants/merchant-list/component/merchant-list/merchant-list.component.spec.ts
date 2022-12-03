import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantListComponent } from './merchant-list.component';

describe('MerchantListComponent', () => {
  let component: MerchantListComponent;
  let fixture: ComponentFixture<MerchantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
