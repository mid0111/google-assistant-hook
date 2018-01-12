import { browser } from 'protractor';
import { AppNavPage } from './app-nav.po';

describe('google-assistant-hook app-nav', () => {
  let page: AppNavPage;

  beforeEach(() => {
    page = new AppNavPage();
    page.navigateTo();
  });

  it('Navigation メニューが表示されること', () => {
    expect(page.title.getText()).toEqual('Google Assistant Hook');
    expect(browser.getCurrentUrl()).toMatch(/http:\/\/[^\/]+\/home$/);

    page.title.click();
    expect(browser.getCurrentUrl()).toMatch(/http:\/\/[^\/]+\/home$/);
  });
});
