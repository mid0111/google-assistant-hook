import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss'],
})
export class AlarmComponent implements OnInit {

  title: string;
  description: string;

  time: string;
  message: string;

  alarms: {
    time: string;
    message: string;
  }[];

  constructor() {
    this.title = 'アラーム';
    this.description = 'アラームの設定をする';

    this.alarms = [{
      time: '07:00',
      message: '授乳時間です。',
    }, {
      time: '08:25',
      message: '朝寝開始５分前です。オムツを交換して寝室に移動しましょう。',
    }, {
      time: '08:30',
      message: '朝寝開始時刻です。',
    }, {
      time: '10:00',
      message: '朝寝終了時刻です。',
    }];
  }

  ngOnInit() {
  }

  onSubmit() {
  }
}
