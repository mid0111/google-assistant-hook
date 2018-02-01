import { Component, OnInit } from '@angular/core';

import { ExtensionService } from '../model/extension.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.scss'],
  providers: [
    ExtensionService,
  ],
})
export class StreamComponent implements OnInit {
  title: String;
  description: String;

  constructor(
    private extensionService: ExtensionService,
  ) { }

  ngOnInit() {
    this.getExtension();
  }

  getExtension(): void {
    this.extensionService.getExtension('/stream')
      .subscribe((extension) => {
        this.title = extension.title;
        this.description = extension.description;
      });
  }
}
