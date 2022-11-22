import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MaterialComponentsModule } from './shared/module/material-components.module';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, HttpClientModule, MaterialComponentsModule],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });
});
