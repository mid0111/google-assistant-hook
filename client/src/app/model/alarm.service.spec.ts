import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SharedModule } from '../shared/shared.module';
import { AlarmService } from './alarm.service';
import { AppSettings } from '../app.settings';

describe('AlarmService', () => {
  let injector: TestBed;
  let service: AlarmService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
      ],
      providers: [AlarmService],
    });
    injector = getTestBed();
    service = injector.get(AlarmService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // mock されていないリクエストが無いことの確認
    httpMock.verify();
  });

  it('アラーム一覧を取得できること', () => {
    const mockAlarms = {
      alarms: [{
        time: '08:10',
        message: 'アラームのメッセージ１',
      }, {
        time: '08:12',
        message: 'アラームのメッセージ２',
      }],
    };

    service.list().subscribe((alarms) => {
      expect(alarms[0].time).toEqual(mockAlarms.alarms[0].time);
      expect(alarms[0].message).toEqual(mockAlarms.alarms[0].message);

      expect(alarms[1].time).toEqual(mockAlarms.alarms[1].time);
      expect(alarms[1].message).toEqual(mockAlarms.alarms[1].message);
    });

    const req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
    expect(req.request.method).toBe('GET');
    req.flush(mockAlarms);
  });

  it('アラームを追加できること', () => {
    const requestAlarm = {
      time: '18:10',
      message: 'アラームのメッセージadd',
    };
    const mockAlarms = {
      alarms: [{
        time: '08:10',
        message: 'アラームのメッセージ１',
      }, {
        time: '08:12',
        message: 'アラームのメッセージ２',
      }],
    };

    service.add(requestAlarm).subscribe((alarms) => {
      expect(alarms[0].time).toEqual(mockAlarms.alarms[0].time);
      expect(alarms[0].message).toEqual(mockAlarms.alarms[0].message);

      expect(alarms[1].time).toEqual(mockAlarms.alarms[1].time);
      expect(alarms[1].message).toEqual(mockAlarms.alarms[1].message);
    });

    const postRequest = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
    expect(postRequest.request.method).toBe('POST');
    postRequest.flush({});

    const getRequest = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
    expect(getRequest.request.method).toBe('GET');
    mockAlarms.alarms.push(requestAlarm);
    getRequest.flush(mockAlarms);
  });

  it('アラームを削除できること', () => {
    const mockAlarms = {
      alarms: [{
        time: '08:10',
        message: 'アラームのメッセージ１',
      }, {
        time: '08:12',
        message: 'アラームのメッセージ２',
      }],
    };

    service.removeAlarm(0).subscribe((alarms) => {
      expect(alarms[0].time).toEqual(mockAlarms.alarms[0].time);
      expect(alarms[0].message).toEqual(mockAlarms.alarms[0].message);
    });

    const deleteRequest = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm/0`);
    expect(deleteRequest.request.method).toBe('DELETE');
    deleteRequest.flush({});

    const getRequest = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
    expect(getRequest.request.method).toBe('GET');
    mockAlarms.alarms.splice(0, 1);
    getRequest.flush(mockAlarms);
  });
});
