
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SharedModule } from '../../shared/shared.module';
import { PodcastComponent } from './podcast.component';
import { StreamService } from '../../model/stream.service';
import { MessageService } from '../../model/message.service';
import { MessageType } from '../../model/message';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/Observable/of';

let component: PodcastComponent;
let fixture: ComponentFixture<PodcastComponent>;
let streamService: StreamService;
let messageService: MessageService;
let page: Page;

const mockPodcast = {
  title: '2: Test Title 2',
  subTitle: 'テストエピソード２などについて話しました。',
  date: 'Jan 06',
  year: '2018',
  url: 'http://cache.dummy.fm/podcast-ep2.mp3',
};

describe('PodcastComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PodcastComponent],
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

  it('ポッドキャスト情報が表示されること', () => {
    expect(page.date.textContent).toBe(mockPodcast.date + ' ' + mockPodcast.year);
    expect(page.title.textContent).toBe(mockPodcast.title);
    expect(page.description.textContent).toBe(mockPodcast.subTitle);
  });

  it('ポッドキャストが再生できること', async(() => {
    spyOn(messageService, 'set');
    spyOn(streamService, 'play')
      .and.returnValue(of(null));

    page.playButton.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      page.addPageElements();

      expect(messageService.set).toHaveBeenCalledWith({
        message: 'ストリームの再生を開始しました。',
        type: MessageType.SUCCESS,
      });
    });
  }));

  it('ポッドキャスト再生でエラーが発生した場合エラーメッセージがセットされること', async(() => {
    const testError = new Error('Test error');
    spyOn(messageService, 'set');
    spyOn(streamService, 'play')
      .and.returnValue(new Observable(
        (subscriber) => subscriber.error(testError)));

    page.playButton.click();

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      page.addPageElements();

      expect(messageService.set).toHaveBeenCalledWith({
        message: 'ストリームの再生に失敗しました。',
        type: MessageType.ERROR,
        error: testError,
      });
    });
  }));
});

class Page {
  date: HTMLElement;
  title: HTMLElement;
  description: HTMLElement;
  playButton: HTMLElement;

  addPageElements() {
    this.date = fixture.debugElement.query(By.css('.card-header')).nativeElement;
    this.title = fixture.debugElement.query(By.css('.card-title')).nativeElement;
    this.description = fixture.debugElement.query(By.css('.card-text')).nativeElement;
    this.playButton = fixture.debugElement.query(By.css('.btn')).nativeElement;
  }
}

function createComponent(testProfile) {
  fixture = TestBed.createComponent(PodcastComponent);
  component = fixture.componentInstance;
  streamService = fixture.debugElement.injector.get(StreamService);
  messageService = fixture.debugElement.injector.get(MessageService);

  component.podcast = mockPodcast;

  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    page.addPageElements();
  });
}
