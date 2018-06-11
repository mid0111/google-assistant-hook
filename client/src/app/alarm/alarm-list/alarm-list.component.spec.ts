import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
    time: '08:10',
    message: 'アラームのメッセージ１',
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

      expect(page.alarmTimes.length).toBe(1);
      expect(page.alarmMessages.length).toBe(1);
      expect(page.alarmActions.length).toBe(1);
      expect(page.getAlarm(0).time).toBe(mockAlarms.alarms[0].time);
      expect(page.getAlarm(0).message).toBe(mockAlarms.alarms[0].message);
      expect(page.getAlarm(0).createButton).toBeTruthy();
      expect(page.getAlarm(0).removeButton).toBeTruthy();
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
});

class Page {
  alarmTimes: DebugElement[];
  alarmMessages: DebugElement[];
  alarmActions: DebugElement[];

  addPageElements() {
    this.alarmTimes = fixture.debugElement.queryAll(By.css('.alarm-time'));
    this.alarmMessages = fixture.debugElement.queryAll(By.css('.alarm-message'));
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
