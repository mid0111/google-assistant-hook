
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SharedModule } from '../../shared/shared.module';
import { StreamFormComponent } from './stream-form.component';
import { StreamService } from '../../model/stream.service';
import { MessageService } from '../../model/message.service';
import { MessageType } from '../../model/message';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

let component: StreamFormComponent;
let fixture: ComponentFixture<StreamFormComponent>;
let streamService: StreamService;
let messageService: MessageService;
let page: Page;

describe('StreamFormComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StreamFormComponent],
      imports: [SharedModule],
      providers: [MessageService],
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    createComponent({
      authenticated: false,
    });
  }));

  it('フォーム画面が表示されること', () => {
    expect(page.labelForUrlInput.textContent).toBe('Google Home で再生したい音楽の URL を入力してください');
    expect(page.urlInput.value).toBe('');
    expect(page.submitButton.textContent).toBe('再生');
    expect(page.submitButton.hasAttribute('disabled')).toBeTruthy();
  });

  it('URL を入力すると再生ボタンが押下できること', async(() => {
    const requestUrl = 'http://example.com/dummy.mp3';
    spyOn(messageService, 'set');
    spyOn(streamService, 'play')
      .and.returnValue(of(null));

    expect(page.submitButton.hasAttribute('disabled')).toBeTruthy();

    page.urlInput.value = requestUrl;
    page.urlInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      page.addPageElements();

      expect(page.urlInput.value).toBe(requestUrl);
      expect(page.submitButton.hasAttribute('disabled')).toBeFalsy();

      page.submitButton.click();
      fixture.detectChanges();
      return fixture.whenStable();
    }).then(() => {
      fixture.detectChanges(); // ngForm 用
      page.addPageElements();

      expect(page.urlInput.value).toBe('');
      expect(page.submitButton.hasAttribute('disabled')).toBeTruthy();

      expect(messageService.set).toHaveBeenCalledWith({
        message: 'ストリームの再生を開始しました。',
        type: MessageType.SUCCESS,
      });
    });
  }));

  it('再生でエラーが発生した場合エラーメッセージがセットされること', async(() => {
    const requestUrl = 'http://example.com/dummy.mp3';
    const testError = new Error('Test error');
    spyOn(messageService, 'set');
    spyOn(streamService, 'play')
      .and.returnValue(new Observable(
        (subscriber) => subscriber.error(testError)));

    expect(page.submitButton.hasAttribute('disabled')).toBeTruthy();

    page.urlInput.value = requestUrl;
    page.urlInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      page.addPageElements();

      expect(page.urlInput.value).toBe(requestUrl);
      expect(page.submitButton.hasAttribute('disabled')).toBeFalsy();

      page.submitButton.click();
      fixture.detectChanges();
      return fixture.whenStable();
    }).then(() => {
      fixture.detectChanges(); // ngForm 用
      page.addPageElements();

      expect(page.urlInput.value).toBe(requestUrl);
      expect(page.submitButton.hasAttribute('disabled')).toBeFalsy();

      expect(messageService.set).toHaveBeenCalledWith({
        message: 'ストリームの再生に失敗しました。',
        type: MessageType.ERROR,
        error: testError,
      });
    });
  }));

});

class Page {
  labelForUrlInput: HTMLElement;
  urlInput: HTMLInputElement;
  submitButton: HTMLElement;

  addPageElements() {
    this.labelForUrlInput = fixture.debugElement.query(By.css('label[for="streamUrl"]')).nativeElement;
    this.urlInput = fixture.debugElement.query(By.css('#streamUrl')).nativeElement;
    this.submitButton = fixture.debugElement.query(By.css('button[type="submit"]')).nativeElement;
  }
}

function createComponent(testProfile) {
  fixture = TestBed.createComponent(StreamFormComponent);
  component = fixture.componentInstance;
  streamService = fixture.debugElement.injector.get(StreamService);
  messageService = fixture.debugElement.injector.get(MessageService);

  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    fixture.detectChanges(); // ngForm 用
    page.addPageElements();
  });
}
