import { TestBed, async } from '@angular/core/testing';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { MenusComponent } from './menus/menus.component';
import { ExtensionsComponent } from './extensions/extensions.component';

describe('HomeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MenusComponent,
        ExtensionsComponent,
      ],
      imports: [
        SharedModule,
      ],
    }).compileComponents();
  }));

  it('HomeComponent が作成できること', async(() => {
    const fixture = TestBed.createComponent(HomeComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component).toBeTruthy();
  }));
});
