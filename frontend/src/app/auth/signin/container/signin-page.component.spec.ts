import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SigninPageComponent } from './signin-page.component';

describe('SigninPageComponent', () => {
  let component: SigninPageComponent;
  let fixture: ComponentFixture<SigninPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SigninPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
