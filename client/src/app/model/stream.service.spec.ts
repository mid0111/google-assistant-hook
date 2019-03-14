import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SharedModule } from '../shared/shared.module';
import { StreamService } from './stream.service';
import { Stream } from './stream';
import { AppSettings } from '../app.settings';

describe('StreamService', () => {
  let injector: TestBed;
  let service: StreamService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
      ],
      providers: [StreamService],
    });
    injector = getTestBed();
    service = injector.get(StreamService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // mock されていないリクエストが無いことの確認
    httpMock.verify();
  });

  it('Stream を再生できること', () => {
    const requestStream: Stream = {
      url: 'http://example.com/dummy.mp3',
    };

    service.play(requestStream).subscribe((res) => {
      expect(res).toBeNull();
    });

    const req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/stream`);
    expect(req.request.method).toBe('POST');
  });
});
