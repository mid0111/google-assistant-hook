import { browser, by, element, ElementFinder } from 'protractor';
import { ElementArrayFinder } from 'protractor/built/element';

export class AppHomePage {
  title: ElementFinder;
  menus: ElementArrayFinder;
  loginMessage: ElementFinder;
  loginLink: ElementFinder;

  shortcutTitle: ElementFinder;
  shortcutDescription: ElementFinder;
  shortcutButton: ElementFinder;

  alarmTitle: ElementFinder;
  alarmDescription: ElementFinder;
  alarmButton: ElementFinder;

  rebuildFmTitle: ElementFinder;
  rebuildFmDescription: ElementFinder;
  rebuildFmButton: ElementFinder;

  streamMusicTitle: ElementFinder;
  streamMusicDescription: ElementFinder;
  streamMusicButton: ElementFinder;

  navigateTo() {
    return browser.get('/home')
      .then(() => this.getPage());
  }

  getPage() {
    this.title = element(by.css('app-home .title'));
    this.menus = element.all(by.css('app-home app-menus li'));
    this.loginMessage = element(by.css('app-home .login-message'));
    this.loginLink = this.loginMessage.element(by.css('a'));

    let index = 0;
    this.shortcutTitle = element.all(by.css('app-home app-extensions .card-title')).get(index);
    this.shortcutDescription = element.all(by.css('app-home app-extensions .card-text')).get(index);
    this.shortcutButton = element.all(by.css('app-home app-extensions .btn')).get(index);

    index++;
    this.alarmTitle = element.all(by.css('app-home app-extensions .card-title')).get(index);
    this.alarmDescription = element.all(by.css('app-home app-extensions .card-text')).get(index);
    this.alarmButton = element.all(by.css('app-home app-extensions .btn')).get(index);

    index++;
    this.rebuildFmTitle = element.all(by.css('app-home app-extensions .card-title')).get(index);
    this.rebuildFmDescription = element.all(by.css('app-home app-extensions .card-text')).get(index);
    this.rebuildFmButton = element.all(by.css('app-home app-extensions .btn')).get(index);

    index++;
    this.streamMusicTitle = element.all(by.css('app-home app-extensions .card-title')).get(index);
    this.streamMusicDescription = element.all(by.css('app-home app-extensions .card-text')).get(index);
    this.streamMusicButton = element.all(by.css('app-home app-extensions .btn')).get(index);
  }
}
