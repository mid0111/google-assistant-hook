import { Component, OnInit } from '@angular/core';

import { StreamService } from '../../model/stream.service';
import { MessageService } from '../../model/message.service';
import { MessageType } from '../../model/message';

@Component({
  selector: 'app-stream-form',
  templateUrl: './stream-form.component.html',
  styleUrls: ['./stream-form.component.scss'],
  providers: [
    StreamService,
  ],
})
export class StreamFormComponent implements OnInit {
  streamUrl: String;

  constructor(private streamService: StreamService, private messageService: MessageService) { }

  ngOnInit() { }

  onSubmit() {
    this.streamService.play({
      url: this.streamUrl,
    })
      .subscribe(
      () => {
        this.streamUrl = undefined;
        this.messageService.set({
          message: 'ストリームの再生を開始しました。',
          type: MessageType.SUCCESS,
        });
      },
      (error) => {
        this.messageService.set({
          message: 'ストリームの再生に失敗しました。',
          type: MessageType.ERROR,
          error,
        });
      },
    );
  }
}
