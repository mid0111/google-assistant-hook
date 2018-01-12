import { browser, by, element, ElementFinder } from 'protractor';
import { ElementArrayFinder } from 'protractor/built/element';

export class AppHomePage {
  title: ElementFinder;
  menus: ElementArrayFinder;
  loginMessage: ElementFinder;
  loginLink: ElementFinder;

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

    this.streamMusicTitle = element(by.css('app-home app-extensions .card-title'));
    this.streamMusicDescription = element(by.css('app-home app-extensions .card-text'));
    this.streamMusicButton = element(by.css('app-home app-extensions .btn'));
  }
}
