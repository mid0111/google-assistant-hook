import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AppSettings } from '../app.settings';

export interface Profile {
  authenticated: Boolean;
}

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(`${AppSettings.API_ENDPOINT}/profile`);
  }
}
