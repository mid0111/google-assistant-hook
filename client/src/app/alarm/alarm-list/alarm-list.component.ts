import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AlarmService } from '../../model/alarm.service';
import { MessageService } from '../../model/message.service';
import { Alarm } from '../../model/alarm';
import { MessageType } from '../../model/message';

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss'],
})
export class AlarmListComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  private alarms: Alarm[];
  private loading = true;
  private beforeUpdateAlarm: Alarm;

  constructor(
    private alarmService: AlarmService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    this.getAlarms();
    this.subscription = this.alarmService.alarms$.subscribe(
      (alarms) => {
        this.alarms = alarms;
      });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // メモリリークを防ぐためアラームリスト用の subscription の監視を明示的に終了
    this.subscription.unsubscribe();
  }

  getAlarms() {
    this.alarmService.list().subscribe(
      () => {
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.messageService.set({
          message: 'アラーム一覧の取得に失敗しました。',
          type: MessageType.ERROR,
          error,
        });
      });
  }

  toggleEditing(alarm: Alarm) {
    if (alarm.editing) {
      this.updateAlarm(alarm);
    } else {
      this.beforeUpdateAlarm = Object.assign({}, alarm);
    }
    alarm.editing = !alarm.editing;
  }

  updateAlarm(alarm: Alarm) {
    this.loading = true;
    this.alarmService.updateAlarm(alarm.id, alarm).subscribe(
      () => {
        this.loading = false;
      },
      (error) => {
        alarm.time = this.beforeUpdateAlarm.time;
        alarm.message = this.beforeUpdateAlarm.message;
        this.loading = false;
        this.messageService.set({
          message: 'アラームの更新に失敗しました。',
          type: MessageType.ERROR,
          error,
        });
      });
  }

  removeAlarm(id: String) {
    this.loading = true;
    this.alarmService.removeAlarm(id).subscribe(
      () => {
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.messageService.set({
          message: 'アラームの削除に失敗しました。',
          type: MessageType.ERROR,
          error,
        });
      });
  }
}
