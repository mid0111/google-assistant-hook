import { } from 'jasmine';

import { TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { AppComponent } from './app.component';
import { MenusComponent } from './menus/menus.component';
import { ProfileService } from './models/profile.service';

describe('AppComponent', () => {
  const profileServiceStub = {
    getProfile: () => of({ authenticated: false })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, MenusComponent
      ],
      providers: [{
        provide: ProfileService, useValue: profileServiceStub
      }]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
