import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { ShortcutComponent } from './shortcut.component';
import { ShortcutService, ShortcutImpl } from '../../model/shortcut.service';
import { SharedModule } from '../../shared/shared.module';
import { MessageService } from '../../model/message.service';
import { MessageType } from '../../model/message';
import { DebugElement } from '@angular/core';

let component: ShortcutComponent;
let fixture: ComponentFixture<ShortcutComponent>;
let messageService: MessageService;
let shortcutService: ShortcutService;
let page: Page;

describe('ShortcutComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShortcutComponent,
      ],
      imports: [
        SharedModule,
      ],
      providers: [
        MessageService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    createComponent();
  }));

  it('ショートカットが表示されること', () => {
    expect(page.title.textContent).toEqual('おやすみなさい');
    expect(page.words[0].textContent).toEqual('おやすみなさい');
    expect(page.words[1].textContent).toEqual('おやすみ');
    expect(page.words[2].textContent).toEqual('いってきます');
    expect(page.machineNames[0].textContent).toEqual('電気');
    expect(page.machineNames[1].textContent).toEqual('TV');
    expect(page.machineNames[2].textContent).toEqual('オーディオ');
    expect(page.machineNames[3].textContent).toEqual('エアコン');
    expect(page.machineOperations[0].textContent).toEqual('OFF');
    expect(page.machineOperations[1].textContent).toEqual('OFF');
    expect(page.machineOperations[2].textContent).toEqual('OFF');
    expect(page.machineOperations[3].textContent).toEqual('OFF');
    expect(page.button.textContent).toEqual('編集');
  });

  it('編集モードに切り替えられること', async(() => {
    page.button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      page.addPageElements();

      expect(page.title.textContent).toEqual('おやすみなさい');
      expect(page.words[0].textContent).toEqual('おやすみなさい');
      expect(page.words[1].textContent).toEqual('おやすみ');
      expect(page.words[2].textContent).toEqual('いってきます');
      expect(page.machineNames[0].textContent).toEqual('電気');
      expect(page.machineNames[1].textContent).toEqual('TV');
      expect(page.machineNames[2].textContent).toEqual('オーディオ');
      expect(page.machineNames[3].textContent).toEqual('エアコン');

      expect(page.lightOptionLabels[0].textContent).toEqual('OFF');
      expect(page.lightOptions[0].nativeElement.checked).toBeTruthy();
      expect(page.lightOptionLabels[1].textContent).toEqual('なし');
      expect(page.lightOptions[1].nativeElement.checked).toBeFalsy();

      expect(page.tvOptionLabels[0].textContent).toEqual('OFF');
      expect(page.tvOptions[0].nativeElement.checked).toBeTruthy();
      expect(page.tvOptionLabels[1].textContent).toEqual('なし');
      expect(page.tvOptions[1].nativeElement.checked).toBeFalsy();

      expect(page.audioOptionLabels[0].textContent).toEqual('OFF');
      expect(page.audioOptions[0].nativeElement.checked).toBeTruthy();
      expect(page.audioOptionLabels[1].textContent).toEqual('なし');
      expect(page.audioOptions[1].nativeElement.checked).toBeFalsy();

      expect(page.airconOptionLabels[0].textContent).toEqual('OFF');
      expect(page.airconOptions[0].nativeElement.checked).toBeTruthy();
      expect(page.airconOptionLabels[1].textContent).toEqual('なし');
      expect(page.airconOptions[1].nativeElement.checked).toBeFalsy();

      expect(page.button.textContent).toEqual('保存');

    });
  }));

  it('編集した値を保存できること', async(() => {
    spyOn(shortcutService, 'updateShortcut')
      .and.returnValue(of(null));

    page.button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      page.addPageElements();

      // 「電気」を「なし」に変更
      page.lightOptions[1].nativeElement.checked = true;
      page.lightOptions[1].triggerEventHandler('change', { target: page.lightOptions[1].nativeElement });

      fixture.detectChanges();
      return fixture.whenStable();
    })
      .then(() => {
        page.addPageElements();
        page.button.click();

        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        page.addPageElements();
        expect(page.button.textContent).toEqual('編集');
      });
  }));

  it('保存でエラーが発生した場合エラーが通知されること', async(() => {
    const testError = new Error('Test error');
    spyOn(messageService, 'set');
    spyOn(shortcutService, 'updateShortcut')
      .and.returnValue(new Observable(
        (subscriber) => subscriber.error(testError)));

    page.button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      page.addPageElements();

      // 「電気」を「なし」に変更
      page.lightOptions[1].nativeElement.checked = true;
      fixture.detectChanges();
      return fixture.whenStable();
    })
      .then(() => {
        page.addPageElements();
        page.button.click();

        fixture.detectChanges();
        return fixture.whenStable();
      })
      .then(() => {
        page.addPageElements();
        expect(page.button.textContent).toEqual('保存');

        expect(messageService.set).toHaveBeenCalledWith({
          message: 'ショートカットの更新に失敗しました。',
          type: MessageType.ERROR,
          error: testError,
        });
      });
  }));
});

class Page {
  title: HTMLElement;
  words: HTMLElement[];
  machineNames: HTMLElement[];
  machineOperations: HTMLElement[];

  lightOptions: DebugElement[];
  lightOptionLabels: HTMLElement[];
  tvOptions: DebugElement[];
  tvOptionLabels: HTMLElement[];
  audioOptions: DebugElement[];
  audioOptionLabels: HTMLElement[];
  airconOptions: DebugElement[];
  airconOptionLabels: HTMLElement[];

  button: HTMLInputElement;


  addPageElements() {
    this.title = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    this.words = fixture.debugElement.queryAll(By.css('.badge'))
      .map((debugElement) => debugElement.nativeElement);
    this.machineNames = fixture.debugElement.queryAll(By.css('.machine-name'))
      .map((debugElement) => debugElement.nativeElement);
    this.machineOperations = fixture.debugElement.queryAll(By.css('.machine-operation span'))
      .map((debugElement) => debugElement.nativeElement);

    const inputOptions: DebugElement[] = fixture.debugElement.queryAll(By.css('input.form-check-input'));
    const inputOptionLabels: HTMLElement[] = fixture.debugElement.queryAll(By.css('label.form-check-label'))
      .map((debugElement) => debugElement.nativeElement);

    this.lightOptions = inputOptions.slice(0, 2);
    this.lightOptionLabels = inputOptionLabels.slice(0, 2);
    this.tvOptions = inputOptions.slice(2, 4);
    this.tvOptionLabels = inputOptionLabels.slice(2, 4);
    this.audioOptions = inputOptions.slice(4, 6);
    this.audioOptionLabels = inputOptionLabels.slice(4, 6);
    this.airconOptions = inputOptions.slice(6, 8);
    this.airconOptionLabels = inputOptionLabels.slice(6, 8);

    this.button = fixture.debugElement.query(By.css('.btn')).nativeElement as HTMLInputElement;
  }
}

function createComponent() {
  fixture = TestBed.createComponent(ShortcutComponent);
  component = fixture.componentInstance;
  shortcutService = fixture.debugElement.injector.get(ShortcutService);
  messageService = fixture.debugElement.injector.get(MessageService);

  page = new Page();
  component.shortcut = new ShortcutImpl(
    0,
    'おやすみなさい',
    ['おやすみなさい', 'おやすみ', 'いってきます'],
    [{
      id: 'light',
      name: '電気',
      operations: ['OFF', 'なし'],
      selectedOperation: 'OFF',
    }, {
      id: 'tv',
      name: 'TV',
      operations: ['OFF', 'なし'],
      selectedOperation: 'OFF',
    }, {
      id: 'audio',
      name: 'オーディオ',
      operations: ['OFF', 'なし'],
      selectedOperation: 'OFF',
    }, {
      id: 'aircon',
      name: 'エアコン',
      operations: ['OFF', 'なし'],
      selectedOperation: 'OFF',
    }],
  );

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    page.addPageElements();
  });
}
