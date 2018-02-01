import { browser, by, element, ElementFinder } from 'protractor';
import { ElementArrayFinder } from 'protractor/built/element';

export interface Shortcut {
  title: ElementFinder;
  words: ElementArrayFinder;
  machines: ElementArrayFinder;
  operations: ElementArrayFinder;
  button: ElementFinder;
}
export class AppShortcutPage {
  title: ElementFinder;
  description: ElementFinder;

  offShortcut: Shortcut;
  onShortcut: Shortcut;

  navigateTo() {
    return browser.get('/shortcut')
      .then(() => this.getPage());
  }

  getPage() {
    this.title = element(by.css('app-shortcut-list .menu > h3'));
    this.description = element(by.css('app-shortcut-list .menu > p'));

    const shortcuts = element.all(by.css('app-shortcut'));
    this.offShortcut = {
      title: shortcuts.get(0).element(by.css('.card-title')),
      words: shortcuts.get(0).all(by.css('.badge')),
      machines: shortcuts.get(0).all(by.css('.machine-name')),
      operations: shortcuts.get(0).all(by.css('.machine-operation')),
      button: shortcuts.get(0).element(by.css('.btn')),
    };

    this.onShortcut = {
      title: shortcuts.get(1).element(by.css('.card-title')),
      words: shortcuts.get(1).all(by.css('.badge')),
      machines: shortcuts.get(1).all(by.css('.machine-name')),
      operations: shortcuts.get(1).all(by.css('.machine-operation')),
      button: shortcuts.get(1).element(by.css('.btn')),
    };

  }
}
