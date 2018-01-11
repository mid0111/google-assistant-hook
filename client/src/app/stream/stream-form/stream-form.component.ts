import { Component, OnInit } from '@angular/core';

import { StreamService } from '../../model/stream.service';

@Component({
  selector: 'app-stream-form',
  templateUrl: './stream-form.component.html',
  styleUrls: ['./stream-form.component.css'],
  providers: [
    StreamService,
  ],
})
export class StreamFormComponent implements OnInit {
  streamUrl: String;

  constructor(private streamService: StreamService) { }

  ngOnInit() { }

  onSubmit() {
    this.streamService.play({
      url: this.streamUrl,
    })
      .subscribe(
      (res) => this.streamUrl = undefined,
      (error) => console.log(error),
    );
  }
}
