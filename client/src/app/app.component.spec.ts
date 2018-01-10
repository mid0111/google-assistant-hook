
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MenusComponent } from './menu/menus.component';
import { NavComponent } from './nav/nav.component';
import { ExtensionsComponent } from './extension/extensions.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MenusComponent,
        NavComponent,
        ExtensionsComponent
      ],
      imports: [HttpClientModule],
    }).compileComponents();
  }));

  it('app が作成されること', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(app.title).toBe('Google Assistant Hook');
  }));
});
