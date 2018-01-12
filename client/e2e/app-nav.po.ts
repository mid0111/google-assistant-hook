import { browser, by, element, ElementFinder } from 'protractor';

export class AppNavPage {
  title: ElementFinder;

  navigateTo() {
    return browser.get('/')
      .then(() => this.getPage());
  }

  getPage() {
    this.title = element(by.css('app-nav .navbar-brand'));
  }
}
