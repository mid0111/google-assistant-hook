import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

import { AppSettings } from '../app.settings';
import { Profile } from './profile';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${AppSettings.API_ENDPOINT}/profile`);
  }
}
