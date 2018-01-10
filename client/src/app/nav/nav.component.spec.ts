import { } from 'jasmine';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NavComponent } from './nav.component';

let component: NavComponent;
let fixture: ComponentFixture<NavComponent>;
let page: Page;

describe('NavComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavComponent],
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    createComponent({
      authenticated: false,
    });
  }));

  it('タイトルが表示されること', () => {
    expect(page.title.textContent.trim()).toBe('Test Title');
  });
});

class Page {
  title: HTMLElement;

  addPageElements() {
    this.title = fixture.debugElement.query(By.css('a.navbar-brand')).nativeElement;
  }
}

function createComponent(testProfile) {
  fixture = TestBed.createComponent(NavComponent);
  component = fixture.componentInstance;
  component.title = 'Test Title';

  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    page.addPageElements();
  });
}
