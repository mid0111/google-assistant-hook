import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';

import { SharedModule } from '../shared/shared.module';
import { RebuildComponent } from './rebuild.component';
import { PodcastComponent } from './podcast/podcast.component';
import { MessageService } from '../model/message.service';
import { RebuildService } from '../model/rebuild.service';

let component: RebuildComponent;
let fixture: ComponentFixture<RebuildComponent>;
let page: Page;
let rebuildService: RebuildService;

const mockRebuild = {
  podcasts: [{
    title: '2: Test Title 2',
    subTitle: 'テストエピソード２などについて話しました。',
    pubDate: '2018-01-06T11:00:00.000Z',
    url: 'http://cache.dummy.fm/podcast-ep2.mp3',
  },
  {
    title: '2: Test Title 1',
    subTitle: 'テストエピソード１などについて話しました。',
    pubDate: '2017-12-24T11:00:00.000Z',
    url: 'http://cache.dummy.fm/podcast-ep1.mp3',
  }],
};

describe('RebuildComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RebuildComponent,
        PodcastComponent,
      ],
      imports: [
        HttpClientModule,
        SharedModule,
      ],
      providers: [
        MessageService,
        RebuildService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    createComponent();
  }));

  it('RebuildComponent が作成できること', () => {
    expect(component).toBeTruthy();
    expect(page.title.textContent).toBe('Rebuild FM ポッドキャスト');
    expect(page.description.textContent).toBe('Rebuild FM のエピソードを Google Home で再生します。');

    expect(page.podcasts.length).toBe(mockRebuild.podcasts.length);
  });
});

class Page {
  title: HTMLElement;
  description: HTMLElement;
  podcasts: HTMLElement[];

  addPageElements() {
    this.title = fixture.debugElement.query(By.css('h3')).nativeElement;
    this.description = fixture.debugElement.query(By.css('p')).nativeElement;
    this.podcasts = fixture.debugElement.queryAll(By.css('app-podcast'))
      .map((debugElement) => debugElement.nativeElement);
  }
}

function createComponent() {
  fixture = TestBed.createComponent(RebuildComponent);
  component = fixture.componentInstance;
  rebuildService = fixture.debugElement.injector.get(RebuildService);

  page = new Page();

  spyOn(rebuildService, 'get')
    .and.returnValue(of(mockRebuild));

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    page.addPageElements();
  });
}
