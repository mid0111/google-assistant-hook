import { Component, OnInit, Input } from '@angular/core';

import { Podcast } from '../../model/podcast';
import { MessageType } from '../../model/message';
import { StreamService } from '../../model/stream.service';
import { MessageService } from '../../model/message.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
  providers: [
    StreamService,
  ],
})
export class PodcastComponent implements OnInit {
  @Input() podcast: Podcast;

  constructor(
    private streamService: StreamService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
  }

  play(url) {
    this.streamService.play({
      url: url,
    })
      .subscribe(
      () => {
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
