import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SharedModule } from '../shared/shared.module';
import { RebuildService } from './rebuild.service';
import { AppSettings } from '../app.settings';

describe('RebuildService', () => {
  let injector: TestBed;
  let service: RebuildService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
      ],
      providers: [RebuildService],
    });
    injector = getTestBed();
    service = injector.get(RebuildService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // mock されていないリクエストが無いことの確認
    httpMock.verify();
  });

  it('ポッドキャスト一覧を取得できること', () => {
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

    service.get().subscribe((rebuild) => {
      expect(rebuild.podcasts[0].title).toEqual(mockRebuild.podcasts[0].title);
      expect(rebuild.podcasts[0].subTitle).toEqual(mockRebuild.podcasts[0].subTitle);
      expect(rebuild.podcasts[0].date).toEqual('Jan 06');
      expect(rebuild.podcasts[0].year).toEqual('2018');
      expect(rebuild.podcasts[0].url).toEqual(mockRebuild.podcasts[0].url);

      expect(rebuild.podcasts[1].title).toEqual(mockRebuild.podcasts[1].title);
      expect(rebuild.podcasts[1].subTitle).toEqual(mockRebuild.podcasts[1].subTitle);
      expect(rebuild.podcasts[1].date).toEqual('Dec 24');
      expect(rebuild.podcasts[1].year).toEqual('2017');
      expect(rebuild.podcasts[1].url).toEqual(mockRebuild.podcasts[1].url);
    });

    const req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/rebuild`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRebuild);
  });
});
