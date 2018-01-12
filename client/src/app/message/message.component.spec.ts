
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MessageComponent } from './message.component';
import { MessageService } from '../model/message.service';
import { Message, MessageType } from '../model/message';

let component: MessageComponent;
let fixture: ComponentFixture<MessageComponent>;
let messageService: MessageService;
let page: Page;

describe('MessageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent],
      providers: [MessageService],
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    createComponent({
      authenticated: false,
    });
  }));

  it('メッセージが存在しない場合表示されないこと', () => {
    expect(page.messages.length).toBe(0);
  });

  it('メッセージが表示されること', () => {
    expect(page.messages.length).toBe(0);

    const requestMessage = {
      message: 'Test message',
      type: MessageType.SUCCESS,
    };
    messageService.set(requestMessage);

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      page.addPageElements();

      expect(page.messages.length).toBe(1);
      expect(page.getMessage(0).message).toEqual(requestMessage.message);
      expect(page.getMessage(0).detail).toBeNull();
      expect(page.getMessage(0).nativeElement.classList).toContain('alert-success');
    });
  });

  it('複数のメッセージが表示されること', () => {
    expect(page.messages.length).toBe(0);

    const requestMessages: Message[] = [{
      message: 'Test message 1',
      type: MessageType.SUCCESS,
    }, {
      message: 'Test message 2',
      type: MessageType.ERROR,
      error: new Error('Test error'),
    }, {
      message: 'Test message 3',
      type: MessageType.WARN,
      error: new Error('Test error'),
    }];
    messageService.set(requestMessages[0]);
    messageService.set(requestMessages[1]);
    messageService.set(requestMessages[2]);

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      page.addPageElements();

      expect(page.messages.length).toBe(3);

      expect(page.getMessage(0).message).toEqual(requestMessages[0].message);
      expect(page.getMessage(0).detail).toBeNull();
      expect(page.getMessage(0).nativeElement.classList).toContain('alert-success');

      expect(page.getMessage(1).message).toEqual(requestMessages[1].message);
      expect(page.getMessage(1).detail).toEqual(requestMessages[1].error.message);
      expect(page.getMessage(1).nativeElement.classList).toContain('alert-danger');

      expect(page.getMessage(2).message).toEqual(requestMessages[2].message);
      expect(page.getMessage(2).detail).toEqual(requestMessages[2].error.message);
      expect(page.getMessage(2).nativeElement.classList).toContain('alert-warning');
    });
  });

  it('close ボタン押下でメッセージが消えること', () => {
    expect(page.messages.length).toBe(0);

    const requestMessages: Message[] = [{
      message: 'Test message 1',
      type: MessageType.SUCCESS,
    }, {
      message: 'Test message 2',
      type: MessageType.ERROR,
      error: new Error('Test error'),
    }, {
      message: 'Test message 3',
      type: MessageType.WARN,
      error: new Error('Test error'),
    }];
    messageService.set(requestMessages[0]);
    messageService.set(requestMessages[1]);
    messageService.set(requestMessages[2]);

    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      page.addPageElements();

      expect(page.messages.length).toBe(3);
      page.getMessage(0).closeButton.click();

      fixture.detectChanges();
      return fixture.whenStable();
    }).then(() => {
      page.addPageElements();

      expect(page.messages.length).toBe(2);

      expect(page.getMessage(0).message).toEqual(requestMessages[1].message);
      expect(page.getMessage(0).detail).toEqual(requestMessages[1].error.message);
      expect(page.getMessage(0).nativeElement.classList).toContain('alert-danger');

      expect(page.getMessage(1).message).toEqual(requestMessages[2].message);
      expect(page.getMessage(1).detail).toEqual(requestMessages[2].error.message);
      expect(page.getMessage(1).nativeElement.classList).toContain('alert-warning');
    });
  });
});

class Page {
  messages: DebugElement[];

  addPageElements() {
    this.messages = fixture.debugElement.queryAll(By.css('.alert'));
  }

  getMessage(index: number) {
    const message = this.messages[index];
    return {
      nativeElement: message.nativeElement as HTMLElement,
      message: message.query(By.css('.message')).nativeElement.textContent,
      detail: message.query(By.css('.detail')) && message.query(By.css('.detail')).nativeElement.textContent,
      closeButton: message.query(By.css('.btn')).nativeElement,
    };
  }
}

function createComponent(testProfile) {
  fixture = TestBed.createComponent(MessageComponent);
  component = fixture.componentInstance;
  messageService = fixture.debugElement.injector.get(MessageService);

  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    page.addPageElements();
  });
}
