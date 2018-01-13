import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
})
export class StreamComponent implements OnInit {
  title: String = 'Stream Music';
  description: String = 'Google Home で再生したい音楽の URL を入力してください。';

  constructor() { }

  ngOnInit() {
  }
}
