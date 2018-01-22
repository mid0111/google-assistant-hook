import { Component, OnInit } from '@angular/core';

import { RebuildService } from '../model/rebuild.service';
import { Podcast } from '../model/podcast';
import { MessageService } from '../model/message.service';
import { MessageType } from '../model/message';

@Component({
  selector: 'app-rebuild',
  templateUrl: './rebuild.component.html',
  styleUrls: ['./rebuild.component.scss'],
  providers: [
    RebuildService,
  ],
})
export class RebuildComponent implements OnInit {
  podcasts: Podcast[];
  title: String = 'Rebuild FM ポッドキャスト';
  description: String = 'Rebuild FM のエピソードを Google Home で再生します。';

  constructor(
    private rebuildService: RebuildService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getPodcasts();
  }

  getPodcasts() {
    this.rebuildService.get()
      .subscribe(
      (rebuild) => this.podcasts = rebuild.podcasts,
      (error) => {
        this.messageService.set({
          message: 'ポッドキャスト一覧の取得に失敗しました。',
          type: MessageType.ERROR,
          error,
        });
      });
  }
}
