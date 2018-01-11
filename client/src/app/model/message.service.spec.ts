import { MessageService } from './message.service';
import { Message, MessageType } from './message';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it('メッセージをセットできること', (async () => {
    const requestMessage: Message = {
      message: 'Test message',
      type: MessageType.SUCCESS,
    };

    service.message.subscribe((message) => {
      expect(message).toEqual(requestMessage);
    });

    service.set(requestMessage);
  }));

  it('エラーメッセージをセットできること', (async () => {
    const requestMessage: Message = {
      message: 'Test error message',
      type: MessageType.SUCCESS,
      error: new Error('Test error'),
    };

    service.message.subscribe((message) => {
      expect(message).toEqual(requestMessage);
    });

    service.set(requestMessage);
  }));
});
