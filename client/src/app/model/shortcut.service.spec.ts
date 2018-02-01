import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SharedModule } from '../shared/shared.module';
import { ShortcutService } from './shortcut.service';
import { AppSettings } from '../app.settings';
import { Shortcut } from './shortcut';

describe('ShortcutService', () => {
  let injector: TestBed;
  let service: ShortcutService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
      ],
      providers: [ShortcutService],
    });
    injector = getTestBed();
    service = injector.get(ShortcutService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // mock されていないリクエストが無いことの確認
    httpMock.verify();
  });

  it('ショートカット一覧を取得できること', () => {
    const mockShortcuts = {
      shortcuts: [{
        name: 'on',
        data: ['tv', 'light', 'cold'],
      },
      {
        name: 'off',
        data: ['audio', 'light'],
      }],
    };

    service.getShortcuts().subscribe((shortcuts) => {
      expect(shortcuts.length).toBe(2);

      let shortcut: Shortcut = shortcuts[0];
      expect(shortcut.id).toEqual(0);
      expect(shortcut.name).toEqual('おやすみなさい');
      expect(shortcut.words).toEqual(['おやすみなさい', 'おやすみ', 'いってきます']);
      expect(shortcut.machines).toEqual([{
        id: 'light',
        name: '電気',
        operations: ['OFF', 'なし'],
        selectedOperation: 'OFF',
      }, {
        id: 'tv',
        name: 'TV',
        operations: ['OFF', 'なし'],
        selectedOperation: 'なし',
      }, {
        id: 'audio',
        name: 'オーディオ',
        operations: ['OFF', 'なし'],
        selectedOperation: 'OFF',
      }, {
        id: 'aircon',
        name: 'エアコン',
        operations: ['OFF', 'なし'],
        selectedOperation: 'なし',
      }]);
      expect(shortcut.isEditMode).toEqual(false);

      shortcut = shortcuts[1];
      expect(shortcut.id).toEqual(1);
      expect(shortcut.name).toEqual('おはよう');
      expect(shortcut.words).toEqual(['おはよう', 'ただいま']);
      expect(shortcut.machines).toEqual([{
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
        selectedOperation: 'なし',
      }, {
        id: 'aircon',
        name: 'エアコン',
        operations: ['冷房 ON', '暖房 ON', 'なし'],
        selectedOperation: '冷房 ON',
      }]);
      expect(shortcut.isEditMode).toEqual(false);
    });

    const req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/shortcut`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockShortcuts);
  });

  it('machine を検索できること', () => {
    const mockShortcuts = {
      shortcuts: [{
        name: 'on',
        data: ['tv', 'light', 'cold'],
      }],
    };

    service.getShortcuts().subscribe((shortcuts: Shortcut[]) => {
      expect(shortcuts[0].getMachine('電気')).toEqual({
        id: 'light',
        name: '電気',
        operations: ['ON', 'なし'],
        selectedOperation: 'ON',
      });

      expect(shortcuts[0].getMachine('TV')).toEqual({
        id: 'tv',
        name: 'TV',
        operations: ['ON', 'なし'],
        selectedOperation: 'ON',
      });

      expect(shortcuts[0].getMachine('オーディオ')).toEqual({
        id: 'audio',
        name: 'オーディオ',
        operations: ['ON', 'なし'],
        selectedOperation: 'なし',
      });

      expect(shortcuts[0].getMachine('エアコン')).toEqual({
        id: 'aircon',
        name: 'エアコン',
        operations: ['冷房 ON', '暖房 ON', 'なし'],
        selectedOperation: '冷房 ON',
      });
    });

    const req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/shortcut`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockShortcuts);
  });

  it('おやすみショートカットを更新できること', () => {
    const requestShortcut: Shortcut = {
      id: 0,
      name: 'おやすみなさい',
      words: ['おやすみなさい', 'おやすみ', 'いってきます'],
      machines: [{
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
      isEditMode: false,
      getMachine: () => this.machines[0],
    };

    service.updateShortcut(requestShortcut).subscribe(() => {

    });

    const req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/shortcut/off`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({
      data: ['light', 'tv', 'audio', 'aircon'],
    });
  });

  it('おはようショートカットを更新できること', () => {
    let requestShortcut: Shortcut = {
      id: 1,
      name: 'おはよう',
      words: ['おはよう', 'ただいま'],
      machines: [{
        id: 'light',
        name: '電気',
        operations: ['ON', 'なし'],
        selectedOperation: 'なし',
      }, {
        id: 'tv',
        name: 'TV',
        operations: ['ON', 'なし'],
        selectedOperation: 'ON',
      }, {
        id: 'audio',
        name: 'オーディオ',
        operations: ['ON', 'なし'],
        selectedOperation: 'なし',
      }, {
        id: 'aircon',
        name: 'エアコン',
        operations: ['冷房 ON', '暖房 ON', 'なし'],
        selectedOperation: '暖房 ON',
      }],
      isEditMode: false,
      getMachine: () => this.machines[0],
    };

    service.updateShortcut(requestShortcut).subscribe(() => {
    });

    let req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/shortcut/on`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({
      data: ['tv', 'heat'],
    });

    requestShortcut = {
      id: 1,
      name: 'おはよう',
      words: ['おはよう', 'ただいま'],
      machines: [{
        id: 'light',
        name: '電気',
        operations: ['ON', 'なし'],
        selectedOperation: 'なし',
      }, {
        id: 'tv',
        name: 'TV',
        operations: ['ON', 'なし'],
        selectedOperation: 'ON',
      }, {
        id: 'audio',
        name: 'オーディオ',
        operations: ['ON', 'なし'],
        selectedOperation: 'なし',
      }, {
        id: 'aircon',
        name: 'エアコン',
        operations: ['冷房 ON', '暖房 ON', 'なし'],
        selectedOperation: '冷房 ON',
      }],
      isEditMode: false,
      getMachine: () => this.machines[0],
    };

    service.updateShortcut(requestShortcut).subscribe(() => {
    });

    req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/shortcut/on`);
    expect(req.request.method).toEqual('PUT');
    expect(req.request.body).toEqual({
      data: ['tv', 'cold'],
    });
  });
});
