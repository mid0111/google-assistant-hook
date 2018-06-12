import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AlarmFormComponent } from './alarm-form.component';
import { AlarmService } from '../../model/alarm.service';
import { SharedModule } from '../../shared/shared.module';
import { MessageService } from '../../model/message.service';
import { AppSettings } from '../../app.settings';
import { Observable } from 'rxjs/Observable';
import { MessageType } from '../../model/message';

let component: AlarmFormComponent;
let fixture: ComponentFixture<AlarmFormComponent>;
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

describe('AlarmFormComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AlarmFormComponent],
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

  it('フォーム画面が表示されること', async(() => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();

      expect(page.labelForTimeInput.textContent).toBe('時刻');
      expect(page.timeInput.textContent).toBe('');
      expect(page.labelForMessageInput.textContent).toBe('メッセージ');
      expect(page.messageInput.textContent).toBe('');
      expect(page.addButton.hasAttribute('disabled')).toBeTruthy();
    });
  }));

  it('時刻とメッセージを入力すると追加ボタンを押下できること', async(() => {
    const requestTime = '08:10';
    const requestMessage = '追加するメッセージ';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();

      page.timeInput.value = requestTime;
      page.timeInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      return fixture.whenStable();
    }).then(() => {
      expect(page.timeInput.value).toBe(requestTime);
      expect(page.addButton.hasAttribute('disabled')).toBeTruthy();

      page.messageInput.value = requestMessage;
      page.messageInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      return fixture.whenStable();
    }).then(() => {
      expect(page.messageInput.value).toBe(requestMessage);
      expect(page.addButton.hasAttribute('disabled')).toBeFalsy();

      page.addButton.click();
      fixture.detectChanges();

      const postRequest = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
      expect(postRequest.request.method).toEqual('POST');
      postRequest.flush({});

      const getRequest = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
      expect(getRequest.request.method).toEqual('GET');
      getRequest.flush(mockAlarms);
      httpMock.verify();

      return fixture.whenStable();
    }).then(() => {
      fixture.detectChanges(); // loading 用
      return fixture.whenStable();
    }).then(() => {
      fixture.detectChanges(); // ngForm 用

      expect(page.timeInput.value).toBe('');
      expect(page.messageInput.value).toBe('');
      expect(page.addButton.hasAttribute('disabled')).toBeTruthy();
    });

  }));

  it('追加でエラーが発生した場合エラーメッセージがセットされること', async(() => {
    const requestTime = '08:10';
    const requestMessage = '追加するメッセージ';
    const testError = new Error('Test error');
    spyOn(messageService, 'set');
    spyOn(alarmService, 'add')
      .and.returnValue(new Observable(
        (subscriber) => subscriber.error(testError)));

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();

      page.timeInput.value = requestTime;
      page.timeInput.dispatchEvent(new Event('input'));
      page.messageInput.value = requestMessage;
      page.messageInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();
      return fixture.whenStable();
    }).then(() => {
      page.addButton.click();

      fixture.detectChanges();
      return fixture.whenStable();
    }).then(() => {
      fixture.detectChanges(); // loading 用
      return fixture.whenStable();
    }).then(() => {
      fixture.detectChanges(); // ngForm 用

      expect(page.timeInput.value).toBe(requestTime);
      expect(page.messageInput.value).toBe(requestMessage);
      expect(page.addButton.hasAttribute('disabled')).toBeFalsy();

      expect(messageService.set).toHaveBeenCalledWith({
        message: 'アラームの登録に失敗しました。',
        type: MessageType.ERROR,
        error: testError,
      });

    });

  }));

});

class Page {
  labelForTimeInput: HTMLElement;
  timeInput: HTMLInputElement;
  labelForMessageInput: HTMLElement;
  messageInput: HTMLInputElement;
  addButton: HTMLElement;

  addPageElements() {
    this.labelForTimeInput = fixture.debugElement.query(By.css('label[for="time"]')).nativeElement;
    this.timeInput = fixture.debugElement.query(By.css('#time')).nativeElement;
    this.labelForMessageInput = fixture.debugElement.query(By.css('label[for="message"]')).nativeElement;
    this.messageInput = fixture.debugElement.query(By.css('#message')).nativeElement;
    this.addButton = fixture.debugElement.query(By.css('button.btn-primary')).nativeElement;
  }
}

function createComponent() {
  fixture = TestBed.createComponent(AlarmFormComponent);
  component = fixture.componentInstance;
  alarmService = TestBed.get(AlarmService);
  messageService = fixture.debugElement.injector.get(MessageService);
  httpMock = TestBed.get(HttpTestingController);

  page = new Page();
}
