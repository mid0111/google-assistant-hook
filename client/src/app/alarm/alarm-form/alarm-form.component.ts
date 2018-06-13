import { Component, OnInit } from '@angular/core';
import { AlarmService } from '../../model/alarm.service';
import { MessageService } from '../../model/message.service';
import { MessageType } from '../../model/message';

@Component({
  selector: 'app-alarm-form',
  templateUrl: './alarm-form.component.html',
  styleUrls: ['./alarm-form.component.scss'],
})
export class AlarmFormComponent implements OnInit {

  time: String;
  message: String;
  loading = false;

  constructor(
    private alarmService: AlarmService,
    private messageService: MessageService,
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.loading = true;
    const alarm = {
      time: this.time,
      message: this.message,
    };
    this.alarmService.add(alarm)
      .subscribe(
        () => {
          this.time = undefined;
          this.message = undefined;
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.messageService.set({
            message: 'アラームの登録に失敗しました。',
            type: MessageType.ERROR,
            error,
          });
        });
  }
}
