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

    expect(page.menus.count()).toEqual(8);
    expect(page.menus.get(0).getText()).toEqual('OK Google!! テレビをつけて!');
    expect(page.menus.get(1).getText()).toEqual('OK Google!! テレビを消して!');
    expect(page.menus.get(2).getText()).toEqual('OK Google!! Rebuild fm を流して!');
    expect(page.menus.get(3).getText()).toEqual('OK Google!! 暖房をつけて!');
    expect(page.menus.get(4).getText()).toEqual('OK Google!! 冷房をつけて!');
    expect(page.menus.get(5).getText()).toEqual('OK Google!! エアコンを消して!');
    expect(page.menus.get(6).getText()).toEqual('OK Google!! 電気をつけて!');
    expect(page.menus.get(7).getText()).toEqual('OK Google!! 電気を消して!');

    expect(page.loginMessage.isPresent()).toBeTruthy();
    expect(page.loginMessage.getText()).toEqual('Google Fit を利用する場合は、あらかじめ Google にログイン してください');

    expect(page.shortcutTitle.getText()).toEqual('ショートカット');
    expect(page.shortcutDescription.getText()).toEqual('音声コマンドのショートカット機能を利用する');
    expect(page.shortcutButton.getText()).toEqual('Shortcut');

    expect(page.alarmTitle.getText()).toEqual('アラーム');
    expect(page.alarmDescription.getText()).toEqual('アラームの設定をする');
    expect(page.alarmButton.getText()).toEqual('Alarm');

    expect(page.rebuildFmTitle.getText()).toEqual('Rebuild FM ポッドキャスト');
    expect(page.rebuildFmDescription.getText()).toEqual('Rebuild FM のエピソードを Google Home で再生');
    expect(page.rebuildFmButton.getText()).toEqual('Rebuild FM');

    expect(page.streamMusicTitle.getText()).toEqual('Stream Music');
    expect(page.streamMusicDescription.getText()).toEqual('Web 上の音楽を Google Home でストリーム再生');
    expect(page.streamMusicButton.getText()).toEqual('Stream Music');
  });

  it('ログインリンク押下でログインページにリダイレクトされること', () => {
    // Angular 以外のページにアクセスするため Angular の同期を解除
    browser.waitForAngularEnabled(false);
    page.loginLink.click();

    browser.sleep(500);
    expect(browser.getCurrentUrl()).toMatch(/https:\/\/example.com\/oauth/);
  });

  it('Shortcut ボタン押下で shortcut ページに遷移すること', () => {
    page.shortcutButton.click();
    expect(browser.getCurrentUrl()).toMatch(/http:\/\/[^\/]+\/shortcut$/);
  });

  it('Alarm ボタン押下で alarm ページに遷移すること', () => {
    page.alarmButton.click();
    expect(browser.getCurrentUrl()).toMatch(/http:\/\/[^\/]+\/alarm$/);
  });

  it('Rebuild FM ボタン押下で stream ページに遷移すること', () => {
    page.rebuildFmButton.click();
    expect(browser.getCurrentUrl()).toMatch(/http:\/\/[^\/]+\/rebuild$/);
  });

  it('Stream Music ボタン押下で stream ページに遷移すること', () => {
    page.streamMusicButton.click();
    expect(browser.getCurrentUrl()).toMatch(/http:\/\/[^\/]+\/stream$/);
  });

});
