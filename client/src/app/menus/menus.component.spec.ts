import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MenusComponent } from './menus.component';
import { ProfileService } from '../profile.service';
import { of } from 'rxjs/observable/of';

describe('MenusComponent', () => {
  let component: MenusComponent;
  let fixture: ComponentFixture<MenusComponent>;
  let profileService: ProfileService;

  let title: DebugElement;
  let menus: DebugElement[];
  let loginMessage: DebugElement;

  const profileServiceStub = {
    getProfile: () => of({ authenticated: false })
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenusComponent],
      providers: [{
        provide: ProfileService, useValue: profileServiceStub
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenusComponent);
    component = fixture.componentInstance;

    profileService = fixture.debugElement.injector.get(ProfileService);
  });

  describe('ログイン前', () => {

    beforeEach(async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        title = fixture.debugElement.query(By.css('.title'));
        menus = fixture.debugElement.queryAll(By.css('li'));
        loginMessage = fixture.debugElement.query(By.css('p'));
      });
    }));

    it('ログインメッセージが表示されること', () => {
      expect(title.nativeElement.textContent).toBe('Google Home に話しかけてみましょう');

      expect(menus.length).toBe(3);
      let i = 0;
      expect(menus[i++].nativeElement.textContent).toBe('OK Google!! テレビをつけて!');
      expect(menus[i++].nativeElement.textContent).toBe('OK Google!! テレビを消して!');
      expect(menus[i++].nativeElement.textContent).toBe('OK Google!! Rebuild fm を流して!');

      expect(loginMessage.nativeElement.textContent).toBe('Google Fit を利用する場合は、あらかじめ\n    Google にログイン してください');
    });
  });

  describe('ログイン後', () => {

    beforeEach(async(() => {
      spyOn(profileService, 'getProfile')
        .and.returnValue(of({
          authenticated: true
        }));

      fixture.detectChanges();
      fixture.whenStable().then(() => {
        title = fixture.debugElement.query(By.css('.title'));
        menus = fixture.debugElement.queryAll(By.css('li'));
        loginMessage = fixture.debugElement.query(By.css('p'));
      });
    }));

    it('健康体操の説明が表示されること', () => {
      expect(title.nativeElement.textContent).toBe('Google Home に話しかけてみましょう');

      expect(menus.length).toBe(5);
      let i = 0;
      expect(menus[i++].nativeElement.textContent).toBe('OK Google!! テレビをつけて!');
      expect(menus[i++].nativeElement.textContent).toBe('OK Google!! テレビを消して!');
      expect(menus[i++].nativeElement.textContent).toBe('OK Google!! Rebuild fm を流して!');
      expect(menus[i++].nativeElement.textContent).toBe('ねぇ Google、健康体操を開始して');
      expect(menus[i++].nativeElement.textContent).toBe('ねぇ Google、健康体操を終了して');

      expect(loginMessage).toBeNull();
    });
  });
});
