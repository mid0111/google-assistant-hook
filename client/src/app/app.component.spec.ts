
import { TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs/observable/of';

import { AppComponent } from './app.component';
import { MenusComponent } from './menu/menus.component';
import { NavComponent } from './nav/nav.component';
import { ProfileService } from './model/profile.service';

describe('AppComponent', () => {
  const profileServiceStub = {
    getProfile: () => of({ authenticated: false })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MenusComponent,
        NavComponent
      ],
      providers: [{
        provide: ProfileService, useValue: profileServiceStub
      }]
    }).compileComponents();
  }));

  it('app が作成されること', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(app.title).toBe('Google Assistant Hook');
  }));
});
