import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniFooterComponent } from './mini-footer.component';

describe('MiniFooterComponent', () => {
  let component: MiniFooterComponent;
  let fixture: ComponentFixture<MiniFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
