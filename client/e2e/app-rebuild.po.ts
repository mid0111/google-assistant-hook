import { browser, by, element, ElementFinder, ElementArrayFinder } from 'protractor';

export class AppRebuildPage {
  title: ElementFinder;
  urlLabel: ElementFinder;
  podcasts: ElementArrayFinder;

  navigateTo() {
    return browser.get('/rebuild')
      .then(() => this.getPage());
  }

  getPage() {
    this.title = element(by.css('app-rebuild .menu > h3'));
    this.urlLabel = element(by.css('app-rebuild .menu > p'));
    this.podcasts = element.all(by.css('app-rebuild app-podcast'));
  }

  getPodcast(index: number) {
    const podcastElement = this.podcasts.get(index);
    return {
      element: podcastElement,
      date: podcastElement.element(by.css('.card-header')),
      title: podcastElement.element(by.css('.card-title')),
      description: podcastElement.element(by.css('.card-text')),
      playButton: podcastElement.element(by.css('.btn')),
    };
  }
}
