import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { AlarmComponent } from './alarm.component';
import { SharedModule } from '../shared/shared.module';
import { AlarmFormComponent } from './alarm-form/alarm-form.component';
import { AlarmListComponent } from './alarm-list/alarm-list.component';
import { AlarmService } from '../model/alarm.service';
import { MessageService } from '../model/message.service';
import { AppSettings } from '../app.settings';

let component: AlarmComponent;
let fixture: ComponentFixture<AlarmComponent>;
let httpMock: HttpTestingController;
let page: Page;

const mockAlarms = {
  alarms: [{
    time: '08:10',
    message: 'アラームのメッセージ１',
  }],
};

describe('AlarmComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmComponent,
        AlarmListComponent,
        AlarmFormComponent,
      ],
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

  it('AlarmComponent が作成できること', () => {
    expect(component).toBeTruthy();
    expect(page.title.textContent).toBe('アラーム');
    expect(page.description.textContent).toBe('アラームの設定をする');
  });
});

class Page {
  title: HTMLElement;
  description: HTMLElement;

  addPageElements() {
    this.title = fixture.debugElement.query(By.css('h3')).nativeElement;
    this.description = fixture.debugElement.query(By.css('p')).nativeElement;
  }
}

function createComponent() {
  fixture = TestBed.createComponent(AlarmComponent);
  component = fixture.componentInstance;
  httpMock = TestBed.get(HttpTestingController);

  page = new Page();

  fixture.detectChanges();
  const req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/alarm`);
  expect(req.request.method).toEqual('GET');
  req.flush(mockAlarms);
  httpMock.verify();

  return fixture.whenStable().then(() => {
    fixture.detectChanges();
    page.addPageElements();
  });
}
