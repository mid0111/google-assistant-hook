import { browser } from 'protractor';
import { AppHomePage } from './app-home.po';

describe('google-assistant-hook app-home', () => {
  let page: AppHomePage;

  beforeEach(() => {
    page = new AppHomePage();
    page.navigateTo();
  });

  it('初期表示', () => {
    expect(page.title.getText()).toEqual('Google Home に話しかけてみましょう');

    expect(page.menus.count()).toEqual(3);
    expect(page.menus.get(0).getText()).toEqual('OK Google!! テレビをつけて!');
    expect(page.menus.get(1).getText()).toEqual('OK Google!! テレビを消して!');
    expect(page.menus.get(2).getText()).toEqual('OK Google!! Rebuild fm を流して!');

    expect(page.loginMessage.isPresent()).toBeTruthy();
    expect(page.loginMessage.getText()).toEqual('Google Fit を利用する場合は、あらかじめ Google にログイン してください');

    expect(page.streamMusicTitle.getText()).toEqual('Stream Music');
    expect(page.streamMusicDescription.getText()).toEqual('Web 上の音楽を Google Home でストリーム再生する');
    expect(page.streamMusicButton.getText()).toEqual('Stream Music');
  });

  // it('ログインリンク押下でログインページにリダイレクトされること', () => {
  //   // Angular 以外のページにアクセスするため Angular の同期を解除
  //   browser.waitForAngularEnabled(false);
  //   page.loginLink.click();

  //   browser.sleep(500);
  //   expect(browser.getCurrentUrl()).toMatch(/https:\/\/accounts.google.com\/.*/);
  // });

  it('Stream Music ボタン押下で stream ページに遷移すること', () => {
    page.streamMusicButton.click();
    expect(browser.getCurrentUrl()).toMatch(/http:\/\/[^\/]+\/stream$/);
  });

});
