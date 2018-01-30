import { Component, OnInit } from '@angular/core';

import { ExtensionService } from '../model/extension.service';
import { RebuildService } from '../model/rebuild.service';
import { Podcast } from '../model/podcast';
import { MessageService } from '../model/message.service';
import { MessageType } from '../model/message';

@Component({
  selector: 'app-rebuild',
  templateUrl: './rebuild.component.html',
  styleUrls: ['./rebuild.component.scss'],
  providers: [
    ExtensionService,
    RebuildService,
  ],
})
export class RebuildComponent implements OnInit {
  podcasts: Podcast[];
  title: String;
  description: String;
  loading = true;

  constructor(
    private extensionService: ExtensionService,
    private rebuildService: RebuildService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.getExtension();
    this.getPodcasts();
  }

  getExtension(): void {
    this.extensionService.getExtension('/rebuild')
      .subscribe((extension) => {
        this.title = extension.title;
        this.description = extension.description;
      });
  }

  getPodcasts() {
    this.rebuildService.get()
      .subscribe(
      (rebuild) => {
        this.podcasts = rebuild.podcasts;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
        this.messageService.set({
          message: 'ポッドキャスト一覧の取得に失敗しました。',
          type: MessageType.ERROR,
          error,
        });
      });
  }
}
