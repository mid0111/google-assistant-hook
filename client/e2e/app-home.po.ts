import { browser, by, element, ElementFinder } from 'protractor';
import { ElementArrayFinder } from 'protractor/built/element';

export class AppHomePage {
  title: ElementFinder;
  menus: ElementArrayFinder;
  loginMessage: ElementFinder;
  loginLink: ElementFinder;

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

    this.rebuildFmTitle = element.all(by.css('app-home app-extensions .card-title')).get(0);
    this.rebuildFmDescription = element.all(by.css('app-home app-extensions .card-text')).get(0);
    this.rebuildFmButton = element.all(by.css('app-home app-extensions .btn')).get(0);

    this.streamMusicTitle = element.all(by.css('app-home app-extensions .card-title')).get(1);
    this.streamMusicDescription = element.all(by.css('app-home app-extensions .card-text')).get(1);
    this.streamMusicButton = element.all(by.css('app-home app-extensions .btn')).get(1);
  }
}
