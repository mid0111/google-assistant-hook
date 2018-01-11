
import { TestBed, async } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';

import { MessageService } from './model/message.service';
import { HomeModule } from './home/home.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MessageComponent } from './message/message.component';
import { StreamModule } from './stream/stream.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavComponent,
        MessageComponent,
      ],
      imports: [
        AppRoutingModule,
        HomeModule,
        StreamModule,
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        MessageService,
      ],
    }).compileComponents();
  }));

  it('app が作成されること', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(app.title).toBe('Google Assistant Hook');
  }));
});
