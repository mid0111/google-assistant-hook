import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
const uuidv4 = require('uuid/v4');

import { AlarmListComponent } from './alarm-list.component';
import { AlarmService } from '../../model/alarm.service';
import { SharedModule } from '../../shared/shared.module';
import { MessageService } from '../../model/message.service';
import { AppSettings } from '../../app.settings';
import { Observable } from 'rxjs/Observable';
import { MessageType } from '../../model/message';

let component: AlarmListComponent;
let fixture: ComponentFixture<AlarmListComponent>;
let httpMock: HttpTestingController;
let alarmService: AlarmService;
let messageService: MessageService;
let page: Page;

const mockAlarms = {
  alarms: [{
    id: uuidv4(),
    time: '08:10',
    message: 'アラームのメッセージ１',
  }, {
    id: uuidv4(),
    time: '08:20',
    message: 'アラームのメッセージ２',
  }],
};

describe('AlarmListComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmListComponent],
      imports: [
        HttpClientTestingModule,
        SharedModule,
      ],
      providers: [
        AlarmService,
        MessageService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    createComponent();
  }));

  it('アラーム一覧が表示されること', async(() => {
    fixture.detectChanges();
    const req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockAlarms);
    httpMock.verify();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();

      expect(page.alarmTimes.length).toBe(2);
      expect(page.alarmMessages.length).toBe(2);
      expect(page.alarmActions.length).toBe(2);

      expect(page.getAlarm(0).time).toBe(mockAlarms.alarms[0].time);
      expect(page.getAlarm(0).message).toBe(mockAlarms.alarms[0].message);
      expect(page.getAlarm(0).createButton).toBeTruthy();
      expect(page.getAlarm(0).removeButton).toBeTruthy();

      expect(page.getAlarm(1).time).toBe(mockAlarms.alarms[1].time);
      expect(page.getAlarm(1).message).toBe(mockAlarms.alarms[1].message);
      expect(page.getAlarm(1).createButton).toBeTruthy();
      expect(page.getAlarm(1).removeButton).toBeTruthy();
    });
  }));

  it('アラーム一覧の取得に失敗した場合メッセージが表示されること', async(() => {
    const testError = new Error('Test error');
    spyOn(messageService, 'set');
    spyOn(alarmService, 'list')
      .and.returnValue(new Observable(
        (subscriber) => subscriber.error(testError)));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      page.addPageElements();

      expect(component).toBeTruthy();
      expect(page.alarmTimes.length).toBe(0);
      expect(page.alarmMessages.length).toBe(0);
      expect(page.alarmActions.length).toBe(0);

      expect(messageService.set).toHaveBeenCalledWith({
        message: 'アラーム一覧の取得に失敗しました。',
        type: MessageType.ERROR,
        error: testError,
      });
    });
  }));

  it('アラーム削除ができること', async(() => {
    fixture.detectChanges();
    const getRequest = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
    expect(getRequest.request.method).toEqual('GET');
    getRequest.flush(mockAlarms);
    httpMock.verify();

    const mockAlarmsAfterDelete = {
      alarms: [{
        id: mockAlarms.alarms[0].id,
        time: mockAlarms.alarms[0].time,
        message: mockAlarms.alarms[0].message,
      }],
    };

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();

      page.getAlarm(1).removeButton.click();

      fixture.detectChanges();
      const deleteRequest = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm/${mockAlarms.alarms[1].id}`);
      expect(deleteRequest.request.method).toEqual('DELETE');
      deleteRequest.flush({});

      const getRequestAfterDelete = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
      expect(getRequestAfterDelete.request.method).toEqual('GET');
      getRequestAfterDelete.flush(mockAlarmsAfterDelete);
      httpMock.verify();

      return fixture.whenStable();
    }).then(() => {
      fixture.detectChanges(); // loading 用
      return fixture.whenStable();
    }).then(() => {
      fixture.detectChanges(); // ngForm 用
      page.addPageElements();

      expect(page.alarmTimes.length).toBe(1);
      expect(page.alarmMessages.length).toBe(1);
      expect(page.alarmActions.length).toBe(1);

      expect(page.getAlarm(0).time).toBe(mockAlarmsAfterDelete.alarms[0].time);
      expect(page.getAlarm(0).message).toBe(mockAlarmsAfterDelete.alarms[0].message);
      expect(page.getAlarm(0).createButton).toBeTruthy();
      expect(page.getAlarm(0).removeButton).toBeTruthy();
    });
  }));

  it('アラーム削除でエラーが発生した場合メッセージが表示されること', async(() => {
    const testError = new Error('Test error');
    spyOn(messageService, 'set');
    spyOn(alarmService, 'removeAlarm')
      .and.returnValue(new Observable(
        (subscriber) => subscriber.error(testError)));

    fixture.detectChanges();
    const getRequest = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
    expect(getRequest.request.method).toEqual('GET');
    getRequest.flush(mockAlarms);
    httpMock.verify();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();

      page.getAlarm(1).removeButton.click();

      fixture.detectChanges();
      return fixture.whenStable();
    }).then(() => {
      fixture.detectChanges(); // loading 用
      return fixture.whenStable();
    }).then(() => {
      fixture.detectChanges(); // ngForm 用
      page.addPageElements();

      expect(page.alarmTimes.length).toBe(2);
      expect(page.alarmMessages.length).toBe(2);
      expect(page.alarmActions.length).toBe(2);

      expect(page.getAlarm(0).time).toBe(mockAlarms.alarms[0].time);
      expect(page.getAlarm(0).message).toBe(mockAlarms.alarms[0].message);
      expect(page.getAlarm(0).createButton).toBeTruthy();
      expect(page.getAlarm(0).removeButton).toBeTruthy();

      expect(page.getAlarm(1).time).toBe(mockAlarms.alarms[1].time);
      expect(page.getAlarm(1).message).toBe(mockAlarms.alarms[1].message);
      expect(page.getAlarm(1).createButton).toBeTruthy();
      expect(page.getAlarm(1).removeButton).toBeTruthy();

      expect(messageService.set).toHaveBeenCalledWith({
        message: 'アラームの削除に失敗しました。',
        type: MessageType.ERROR,
        error: testError,
      });

    });
  }));
});

class Page {
  alarmTimes: DebugElement[];
  alarmMessages: DebugElement[];
  alarmActions: DebugElement[];

  addPageElements() {
    this.alarmTimes = fixture.debugElement.queryAll(By.css('.alarm-time div'));
    this.alarmMessages = fixture.debugElement.queryAll(By.css('.alarm-message div'));
    this.alarmActions = fixture.debugElement.queryAll(By.css('.alarm-action'));
  }

  getAlarm(index: number) {
    const actionButtons = this.alarmActions[index].queryAll(By.css('.material-icons'));
    return {
      time: (this.alarmTimes[index].nativeElement as HTMLElement).textContent,
      message: (this.alarmMessages[index].nativeElement as HTMLElement).textContent,
      createButton: actionButtons[0].nativeElement as HTMLElement,
      removeButton: actionButtons[1].nativeElement as HTMLElement,
    };
  }
}

function createComponent() {
  fixture = TestBed.createComponent(AlarmListComponent);
  component = fixture.componentInstance;
  alarmService = TestBed.get(AlarmService);
  messageService = fixture.debugElement.injector.get(MessageService);
  httpMock = TestBed.get(HttpTestingController);

  page = new Page();
}
