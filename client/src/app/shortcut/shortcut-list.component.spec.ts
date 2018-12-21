import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';

import { ShortcutListComponent } from './shortcut-list.component';
import { ShortcutService, ShortcutImpl } from '../model/shortcut.service';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from '../model/message.service';
import { ShortcutComponent } from './shortcut/shortcut.component';

let component: ShortcutListComponent;
let fixture: ComponentFixture<ShortcutListComponent>;
let shortcutService: ShortcutService;
let messageService: MessageService;
let page: Page;
const testShortcuts = [
  new ShortcutImpl(
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
  ),
  new ShortcutImpl(
    1,
    'おはよう',
    ['おはよう', 'ただいま'],
    [{
      id: 'light',
      name: '電気',
      operations: ['ON', 'なし'],
      selectedOperation: 'ON',
    }, {
      id: 'tv',
      name: 'TV',
      operations: ['ON', 'なし'],
      selectedOperation: 'ON',
    }, {
      id: 'audio',
      name: 'オーディオ',
      operations: ['ON', 'なし'],
      selectedOperation: 'ON',
    }, {
      id: 'aircon',
      name: 'エアコン',
      operations: ['冷房 ON', '暖房 ON', 'なし'],
      selectedOperation: '暖房 ON',
    }],
  ),
];

describe('ShortcutListComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ShortcutListComponent,
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

  it('ショートカット画面が表示されること', () => {
    expect(page.title.textContent).toEqual('ショートカット');
    expect(page.description.textContent).toEqual('音声コマンドのショートカット機能を利用する');
    expect(page.shortcuts.length).toEqual(2);

    let card = page.getCard(0);
    expect(card.title.textContent).toEqual('おやすみなさい');
    expect(card.words[0].textContent).toEqual('おやすみなさい');
    expect(card.words[1].textContent).toEqual('おやすみ');
    expect(card.words[2].textContent).toEqual('いってきます');
    expect(card.macineNames[0].textContent).toEqual('電気');
    expect(card.macineNames[1].textContent).toEqual('TV');
    expect(card.macineNames[2].textContent).toEqual('オーディオ');
    expect(card.macineNames[3].textContent).toEqual('エアコン');
    expect(card.machineOperations[0].textContent).toEqual('OFF');
    expect(card.machineOperations[1].textContent).toEqual('OFF');
    expect(card.machineOperations[2].textContent).toEqual('OFF');
    expect(card.machineOperations[3].textContent).toEqual('OFF');
    expect(card.button.textContent).toEqual('編集');

    card = page.getCard(1);
    expect(card.title.textContent).toEqual('おはよう');
    expect(card.words[0].textContent).toEqual('おはよう');
    expect(card.words[1].textContent).toEqual('ただいま');
    expect(card.macineNames[0].textContent).toEqual('電気');
    expect(card.macineNames[1].textContent).toEqual('TV');
    expect(card.macineNames[2].textContent).toEqual('オーディオ');
    expect(card.macineNames[3].textContent).toEqual('エアコン');
    expect(card.machineOperations[0].textContent).toEqual('ON');
    expect(card.machineOperations[1].textContent).toEqual('ON');
    expect(card.machineOperations[2].textContent).toEqual('ON');
    expect(card.machineOperations[3].textContent).toEqual('暖房 ON');
    expect(card.button.textContent).toEqual('編集');
  });

  it('編集モードに切り替えられること', async(() => {
    page.getCard(0).button.click();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      page.addPageElements();

      let card = page.getCard(0);
      expect(card.title.textContent).toEqual('おやすみなさい');
      expect(card.words[0].textContent).toEqual('おやすみなさい');
      expect(card.words[1].textContent).toEqual('おやすみ');
      expect(card.words[2].textContent).toEqual('いってきます');
      expect(card.macineNames[0].textContent).toEqual('電気');
      expect(card.macineNames[1].textContent).toEqual('TV');
      expect(card.macineNames[2].textContent).toEqual('オーディオ');
      expect(card.macineNames[3].textContent).toEqual('エアコン');

      expect(card.lightOptionLabels[0].textContent).toEqual('OFF');
      expect(card.lightOptions[0].checked).toBeTruthy();
      expect(card.lightOptionLabels[1].textContent).toEqual('なし');
      expect(card.lightOptions[1].checked).toBeFalsy();

      expect(card.tvOptionLabels[0].textContent).toEqual('OFF');
      expect(card.tvOptions[0].checked).toBeTruthy();
      expect(card.tvOptionLabels[1].textContent).toEqual('なし');
      expect(card.tvOptions[1].checked).toBeFalsy();

      expect(card.audioOptionLabels[0].textContent).toEqual('OFF');
      expect(card.audioOptions[0].checked).toBeTruthy();
      expect(card.audioOptionLabels[1].textContent).toEqual('なし');
      expect(card.audioOptions[1].checked).toBeFalsy();

      expect(card.airconOptionLabels[0].textContent).toEqual('OFF');
      expect(card.airconOptions[0].checked).toBeTruthy();
      expect(card.airconOptionLabels[1].textContent).toEqual('なし');
      expect(card.airconOptions[1].checked).toBeFalsy();

      expect(card.button.textContent).toEqual('保存');

      card = page.getCard(1);
      expect(card.title.textContent).toEqual('おはよう');
      expect(card.words[0].textContent).toEqual('おはよう');
      expect(card.words[1].textContent).toEqual('ただいま');
      expect(card.macineNames[0].textContent).toEqual('電気');
      expect(card.macineNames[1].textContent).toEqual('TV');
      expect(card.macineNames[2].textContent).toEqual('オーディオ');
      expect(card.macineNames[3].textContent).toEqual('エアコン');
      expect(card.machineOperations[0].textContent).toEqual('ON');
      expect(card.machineOperations[1].textContent).toEqual('ON');
      expect(card.machineOperations[2].textContent).toEqual('ON');
      expect(card.machineOperations[3].textContent).toEqual('暖房 ON');
      expect(card.button.textContent).toEqual('編集');
    });
  }));

});

class Page {
  title: HTMLElement;
  description: HTMLElement;
  shortcuts: DebugElement[];

  addPageElements() {
    this.title = fixture.debugElement.query(By.css('.menu h3')).nativeElement;
    this.description = fixture.debugElement.query(By.css('.menu p')).nativeElement;
    this.shortcuts = fixture.debugElement.queryAll(By.css('.card'));
  }

  getCard(index: number) {
    const card = this.shortcuts[index];
    const inputOptions = card.queryAll(By.css('input.form-check-input')).map((debugElement) => debugElement.nativeElement);
    const inputOptionLabels = card.queryAll(By.css('label.form-check-label')).map((debugElement) => debugElement.nativeElement);
    return {
      title: card.query(By.css('.card-title')).nativeElement,
      words: card.queryAll(By.css('.badge')).map((debugElement) => debugElement.nativeElement),
      macineNames: card.queryAll(By.css('.machine-name')).map((debugElement) => debugElement.nativeElement),
      machineOperations: card.queryAll(By.css('.machine-operation span')).map((debugElement) => debugElement.nativeElement),

      lightOptions: inputOptions.slice(0, 2),
      lightOptionLabels: inputOptionLabels.slice(0, 2),
      tvOptions: inputOptions.slice(2, 4),
      tvOptionLabels: inputOptionLabels.slice(2, 4),
      audioOptions: inputOptions.slice(4, 6),
      audioOptionLabels: inputOptionLabels.slice(4, 6),
      airconOptions: inputOptions.slice(6, 8),
      airconOptionLabels: inputOptionLabels.slice(6, 8),

      button: card.query(By.css('.btn')).nativeElement as HTMLInputElement,
    };
  }
}

function createComponent() {
  fixture = TestBed.createComponent(ShortcutListComponent);
  component = fixture.componentInstance;
  shortcutService = fixture.debugElement.injector.get(ShortcutService);
  messageService = fixture.debugElement.injector.get(MessageService);

  spyOn(shortcutService, 'getShortcuts')
    .and.returnValue(of(testShortcuts));

  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    page.addPageElements();
  });
}
