import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alarm-form',
  templateUrl: './alarm-form.component.html',
  styleUrls: ['./alarm-form.component.scss'],
})
export class AlarmFormComponent implements OnInit {

  time: string;
  message: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
  }
}
