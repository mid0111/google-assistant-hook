import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Message } from './message';

@Injectable()
export class MessageService {
  message: Observable<Message>;
  messageChangeObserver: Observer<Message>;

  constructor() {
    this.message = new Observable((observer: Observer<Message>) => {
      this.messageChangeObserver = observer;
    });
  }

  set(message: Message) {
    this.messageChangeObserver.next(message);
  }
}
