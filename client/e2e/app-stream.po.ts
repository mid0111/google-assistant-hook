import { browser, by, element, ElementFinder } from 'protractor';

export class AppStreamPage {
  title: ElementFinder;
  description: ElementFinder;
  urlLabel: ElementFinder;
  urlInput: ElementFinder;
  submitButton: ElementFinder;

  navigateTo() {
    return browser.get('/stream')
      .then(() => this.getPage());
  }

  getPage() {
    this.title = element(by.css('app-stream .menu > h3'));
    this.description = element(by.css('app-stream .menu > p'));
    this.urlLabel = element(by.css('app-stream label[for="streamUrl"]'));
    this.urlInput = element(by.css('app-stream #streamUrl'));
    this.submitButton = element(by.css('app-stream button[type="submit"]'));
  }
}
