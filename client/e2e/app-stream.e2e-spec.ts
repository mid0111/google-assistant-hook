import { browser } from 'protractor';
import { AppStreamPage } from './app-stream.po';

describe('google-assistant-hook app-stream', () => {
  let page: AppStreamPage;

  beforeEach(() => {
    page = new AppStreamPage();
    page.navigateTo();
  });

  it('初期表示', () => {
    expect(page.title.getText()).toEqual('Stream Music');
    expect(page.urlLabel.getText()).toEqual('Google Home で再生したい音楽の URL を入力してください。');
    expect(page.submitButton.getAttribute('disabled')).toBeTruthy();
  });

  it('URL を入力できること', () => {
    page.urlInput.sendKeys('http://dummy.com/dummy.mp3');
    expect(page.submitButton.getAttribute('disabled')).toBeFalsy();
  });

});
