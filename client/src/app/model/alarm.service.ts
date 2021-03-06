
import { mergeMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';



import { AppSettings } from '../app.settings';
import { Alarm } from './alarm';

@Injectable()
export class AlarmService {
  private alarmsSource: Subject<Alarm[]> = new Subject<Alarm[]>();
  public alarms$: Observable<Alarm[]> = this.alarmsSource.asObservable();

  constructor(private http: HttpClient) { }

  list(): Observable<Alarm[]> {
    return this.http.get<Object>(`${AppSettings.API_ENDPOINT}/alarm`).pipe(
      map((res) => {
        return res['alarms'].map((alarm) => {
          return {
            id: alarm.id,
            time: alarm.time,
            message: alarm.message,
          } as Alarm;
        });
      }),
      map((alarms) => {
        this.alarmsSource.next(alarms);
        return alarms;
      }));
  }

  add(alarm: Alarm): Observable<Alarm[]> {
    return this.http.post<Alarm>(`${AppSettings.API_ENDPOINT}/alarm`, alarm).pipe(
      mergeMap(() => this.list()));
  }

  updateAlarm(id: String, alarm: Alarm): Observable<Alarm[]> {
    return this.http.put<void>(`${AppSettings.API_ENDPOINT}/alarm/${id}`, alarm).pipe(
      mergeMap(() => this.list()));
  }

  removeAlarm(id: String): Observable<Alarm[]> {
    return this.http.delete<void>(`${AppSettings.API_ENDPOINT}/alarm/${id}`).pipe(
      mergeMap(() => this.list()));
  }

}
