import { Component, OnInit } from '@angular/core';
import { ExtensionService } from '../model/extension.service';

@Component({
  selector: 'app-alarm',
  templateUrl: './alarm.component.html',
  styleUrls: ['./alarm.component.scss'],
  providers: [
    ExtensionService,
  ],
})
export class AlarmComponent implements OnInit {

  title: String;
  description: String;

  constructor(
    private extensionService: ExtensionService,
  ) { }

  getExtension(): void {
    this.extensionService.getExtension('/alarm')
      .subscribe((extension) => {
        this.title = extension.title;
        this.description = extension.description;
      });
  }

  ngOnInit() {
    this.getExtension();
  }
}
