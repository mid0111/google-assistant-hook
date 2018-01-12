import { browser, by, element, ElementFinder } from 'protractor';
import { ElementArrayFinder } from 'protractor/built/element';

export class AppStreamPage {
  title: ElementFinder;
  urlLabel: ElementFinder;
  urlInput: ElementFinder;
  submitButton: ElementFinder;

  navigateTo() {
    return browser.get('/stream')
      .then(() => this.getPage());
  }

  getPage() {
    this.title = element(by.css('app-stream .menu > h3'));
    this.urlLabel = element(by.css('app-stream .menu > p'));
    this.urlInput = element(by.css('app-stream #streamUrl'));
    this.submitButton = element(by.css('app-stream button[type="submit"]'));
  }
}
