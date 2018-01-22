import { AppRebuildPage } from './app-rebuild.po';

describe('google-assistant-hook app-stream', () => {
  let page: AppRebuildPage;

  beforeEach(() => {
    page = new AppRebuildPage();
    page.navigateTo();
  });

  it('初期表示', () => {
    expect(page.title.getText()).toEqual('Rebuild FM ポッドキャスト');
    expect(page.urlLabel.getText()).toEqual('Rebuild FM のエピソードを Google Home で再生する');

    expect(page.podcasts.count()).toEqual(2);

    expect(page.getPodcast(0).title.getText()).toEqual('2: Test Title 2');
    expect(page.getPodcast(0).date.getText()).toEqual('Jan 06 2018');
    expect(page.getPodcast(0).description.getText()).toEqual('テストエピソード２などについて話しました。');
    expect(page.getPodcast(0).playButton.getText()).toEqual('再生');

    expect(page.getPodcast(1).title.getText()).toEqual('2: Test Title 1');
    expect(page.getPodcast(1).date.getText()).toEqual('Dec 24 2017');
    expect(page.getPodcast(1).description.getText()).toEqual('テストエピソード１などについて話しました。');
    expect(page.getPodcast(1).playButton.getText()).toEqual('再生');
  });

  it('再生できること', () => {
    page.getPodcast(1).playButton.click();
  });

});
