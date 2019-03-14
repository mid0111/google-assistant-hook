import { AppStreamPage } from './app-stream.po';
import { browser } from 'protractor';

describe('google-assistant-hook app-stream', () => {
  let page: AppStreamPage;

  beforeEach(() => {
    page = new AppStreamPage();
    page.navigateTo();
  });

  it('初期表示', () => {
    expect(page.title.getText()).toEqual('Stream Music');
    expect(page.description.getText()).toEqual('Web 上の音楽を Google Home でストリーム再生');
    expect(page.urlLabel.getText()).toEqual('Google Home で再生したい音楽の URL を入力してください');

    expect(page.urlInput.getAttribute('value')).toEqual('');
    expect(page.submitButton.getAttribute('disabled')).toBeTruthy();
  });

  it('URL を入力できること', () => {
    page.urlInput.sendKeys('http://example.com/dummy.mp3');
    expect(page.urlInput.getAttribute('value')).toEqual('http://example.com/dummy.mp3');
    expect(page.submitButton.getAttribute('disabled')).toBeFalsy();

    page.submitButton.click();
    browser.sleep(500);
    expect(page.urlInput.getAttribute('value')).toEqual('');
    expect(page.submitButton.getAttribute('disabled')).toBeTruthy();
  });

});
