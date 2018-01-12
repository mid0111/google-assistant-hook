export interface Message {
  message: String;
  type: MessageType;
  error?: Error;
}

export enum MessageType {
  ERROR,
  WARN,
  SUCCESS,
}
