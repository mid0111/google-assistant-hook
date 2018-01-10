import { Component, OnInit } from '@angular/core';

import { ExtensionService } from '../model/extension.service';
import { Extension } from '../model/extension';

@Component({
  selector: 'app-extensions',
  templateUrl: './extensions.component.html',
  styleUrls: ['./extensions.component.css'],
  providers: [
    ExtensionService,
  ],
})
export class ExtensionsComponent implements OnInit {
  extensions: Extension[];

  constructor(private extensionService: ExtensionService) { }

  ngOnInit() {
    this.getExtensions();
  }

  getExtensions(): void {
    this.extensionService.getExtensions()
      .subscribe((extensions) => this.extensions = extensions);
  }
}
