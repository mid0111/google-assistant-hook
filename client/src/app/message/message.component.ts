import { Component, OnInit } from '@angular/core';

import { MessageService } from '../model/message.service';
import { MessageType } from '../model/message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  messages: Object[] = [];

  constructor(private messageService: MessageService) {
    this.messageService.message.subscribe((message) => {
      let type;
      switch (message.type) {
        case MessageType.WARN:
          type = 'warning';
          break;

        case MessageType.ERROR:
          type = 'danger';
          break;

        default:
          type = 'success';
          break;
      }

      this.messages.push({
        message: message.message,
        type,
        detail: message.error && message.error.message,
      });
    });
  }

  ngOnInit() { }

  onClose(index) {
    this.messages.splice(index, 1);
  }
}
