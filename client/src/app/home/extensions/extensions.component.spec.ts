import { } from 'jasmine';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs/observable/of';

import { ExtensionsComponent } from './extensions.component';
import { Extension } from '../../model/extension';
import { ExtensionService } from '../../model/extension.service';

let component: ExtensionsComponent;
let fixture: ComponentFixture<ExtensionsComponent>;
let extensionService: ExtensionService;
let page: Page;

const mockExtensions: Extension[] = [{
  title: 'Stream Music',
  description: 'Web 上の音楽を Google Home でストリーム再生',
  path: '/stream',
  btnName: 'Stream Music',
}];

describe('ExtensionsComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExtensionsComponent],
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    createComponent();
  }));

  it('Extension 一覧が表示されること', () => {
    expect(page.extensions.length).toBe(1);
    expect(page.getExtension(0).title).toBe(mockExtensions[0].title);
    expect(page.getExtension(0).description).toBe(mockExtensions[0].description);
    expect(page.getExtension(0).path).toBe(mockExtensions[0].path);
    expect(page.getExtension(0).btnName).toBe(mockExtensions[0].btnName);
  });
});

class Page {
  extensions: DebugElement[];

  addPageElements() {
    this.extensions = fixture.debugElement.queryAll(By.css('.card-body'));
  }

  getExtension(index: number): Extension {
    const extension = this.extensions[index];
    const button: HTMLElement = extension.query(By.css('.btn')).nativeElement;
    return {
      title: (extension.query(By.css('.card-title')).nativeElement as HTMLElement).textContent,
      description: (extension.query(By.css('.card-text')).nativeElement as HTMLElement).textContent,
      path: button.getAttribute('href'),
      btnName: button.textContent,
    };
  }
}

function createComponent() {
  fixture = TestBed.createComponent(ExtensionsComponent);
  component = fixture.componentInstance;
  extensionService = fixture.debugElement.injector.get(ExtensionService);

  spyOn(extensionService, 'getExtensions')
    .and.returnValue(of(mockExtensions));

  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    page.addPageElements();
  });
}
