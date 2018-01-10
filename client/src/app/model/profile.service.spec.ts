import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProfileService, Profile } from './profile.service';
import { AppSettings } from '../app.settings';

describe('ProfileService', () => {
  let injector: TestBed;
  let service: ProfileService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService]
    });
    injector = getTestBed();
    service = injector.get(ProfileService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    // mock されていないリクエストが無いことの確認
    httpMock.verify();
  });

  it('Profile を取得できること', () => {
    const mockProfile: Profile = {
      authenticated: true
    };

    service.getProfile().subscribe((profile) => {
      expect(profile.authenticated).toBe(true);
      expect(profile).toEqual(mockProfile);
    });

    const req = httpMock.expectOne(`${AppSettings.API_ENDPOINT}/profile`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProfile);
  });
});
