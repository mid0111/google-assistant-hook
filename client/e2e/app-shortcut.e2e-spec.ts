import { AppShortcutPage } from './app-shortcut.po';

describe('google-assistant-hook app-shortcut', () => {
  let page: AppShortcutPage;

  beforeEach(() => {
    page = new AppShortcutPage();
    page.navigateTo();
  });

  it('初期表示', () => {
    expect(page.title.getText()).toEqual('ショートカット');
    expect(page.description.getText()).toEqual('音声コマンドのショートカット機能を利用する');

    // おやすみなさい
    expect(page.offShortcut.title.getText()).toEqual('おやすみなさい');

    expect(page.offShortcut.words.get(0).getText()).toEqual('おやすみなさい');
    expect(page.offShortcut.words.get(1).getText()).toEqual('おやすみ');
    expect(page.offShortcut.words.get(2).getText()).toEqual('いってきます');

    expect(page.offShortcut.machines.get(0).getText()).toEqual('電気');
    expect(page.offShortcut.machines.get(1).getText()).toEqual('TV');
    expect(page.offShortcut.machines.get(2).getText()).toEqual('オーディオ');
    expect(page.offShortcut.machines.get(3).getText()).toEqual('エアコン');

    expect(page.offShortcut.operations.get(0).getText()).toEqual('OFF');
    expect(page.offShortcut.operations.get(1).getText()).toEqual('OFF');
    expect(page.offShortcut.operations.get(2).getText()).toEqual('OFF');
    expect(page.offShortcut.operations.get(3).getText()).toEqual('OFF');

    expect(page.offShortcut.button.getText()).toEqual('編集');

    // おはよう
    expect(page.onShortcut.title.getText()).toEqual('おはよう');

    expect(page.onShortcut.words.get(0).getText()).toEqual('おはよう');
    expect(page.onShortcut.words.get(1).getText()).toEqual('ただいま');

    expect(page.onShortcut.machines.get(0).getText()).toEqual('電気');
    expect(page.onShortcut.machines.get(1).getText()).toEqual('TV');
    expect(page.onShortcut.machines.get(2).getText()).toEqual('オーディオ');
    expect(page.onShortcut.machines.get(3).getText()).toEqual('エアコン');

    expect(page.onShortcut.operations.get(0).getText()).toEqual('ON');
    expect(page.onShortcut.operations.get(1).getText()).toEqual('ON');
    expect(page.onShortcut.operations.get(2).getText()).toEqual('ON');
    expect(page.onShortcut.operations.get(3).getText()).toEqual('暖房 ON');

    expect(page.onShortcut.button.getText()).toEqual('編集');
  });

  it('編集できること', () => {
    page.offShortcut.button.click();
    expect(page.offShortcut.button.getText()).toEqual('保存');

    page.offShortcut.button.click();
    expect(page.offShortcut.button.getText()).toEqual('編集');
  });
});
