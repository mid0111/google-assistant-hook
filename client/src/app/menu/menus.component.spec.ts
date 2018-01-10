import { } from 'jasmine';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MenusComponent } from './menus.component';
import { ProfileService } from '../model/profile.service';
import { of } from 'rxjs/observable/of';

let component: MenusComponent;
let fixture: ComponentFixture<MenusComponent>;
let profileService: ProfileService;
let page: Page;

describe('MenusComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MenusComponent],
      imports: [HttpClientModule]
    })
      .compileComponents();
  }));

  describe('ログイン前', () => {

    beforeEach(async(() => {
      createComponent({
        authenticated: false
      });
    }));

    it('ログインメッセージが表示されること', () => {
      expect(page.title.textContent).toBe('Google Home に話しかけてみましょう');

      expect(page.menus.length).toBe(3);
      let i = 0;
      expect(page.menus[i++].textContent).toBe('OK Google!! テレビをつけて!');
      expect(page.menus[i++].textContent).toBe('OK Google!! テレビを消して!');
      expect(page.menus[i++].textContent).toBe('OK Google!! Rebuild fm を流して!');

      expect(page.loginMessage.nativeElement.textContent).toBe('Google Fit を利用する場合は、あらかじめ\n    Google にログイン してください');
    });
  });

  describe('ログイン後', () => {

    beforeEach(async(() => {
      createComponent({
        authenticated: true
      });
    }));

    it('健康体操の説明が表示されること', () => {
      expect(page.title.textContent).toBe('Google Home に話しかけてみましょう');

      expect(page.menus.length).toBe(5);
      let i = 0;
      expect(page.menus[i++].textContent).toBe('OK Google!! テレビをつけて!');
      expect(page.menus[i++].textContent).toBe('OK Google!! テレビを消して!');
      expect(page.menus[i++].textContent).toBe('OK Google!! Rebuild fm を流して!');
      expect(page.menus[i++].textContent).toBe('ねぇ Google、健康体操を開始して');
      expect(page.menus[i++].textContent).toBe('ねぇ Google、健康体操を終了して');

      expect(page.loginMessage).toBeNull();
    });
  });
});

class Page {
  title: HTMLElement;
  menus: HTMLElement[];
  loginMessage: DebugElement;

  addPageElements() {
    this.title = fixture.debugElement.query(By.css('.title')).nativeElement;
    this.menus = fixture.debugElement.queryAll(By.css('li'))
      .map((debugElement) => debugElement.nativeElement);
    this.loginMessage = fixture.debugElement.query(By.css('p'));
  }
}

function createComponent(testProfile) {
  fixture = TestBed.createComponent(MenusComponent);
  component = fixture.componentInstance;
  profileService = fixture.debugElement.injector.get(ProfileService);

  spyOn(profileService, 'getProfile')
    .and.returnValue(of(testProfile));

  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    page.addPageElements();
  });
}
