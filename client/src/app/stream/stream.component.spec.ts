
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { StreamComponent } from './stream.component';
import { StreamFormComponent } from './stream-form/stream-form.component';
import { MessageService } from '../model/message.service';

let component: StreamComponent;
let fixture: ComponentFixture<StreamComponent>;
let page: Page;

describe('StreamComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StreamComponent,
        StreamFormComponent,
      ],
      imports: [
        HttpClientModule,
        SharedModule,
      ],
      providers: [
        MessageService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(async(() => {
    createComponent();
  }));

  it('StreamComponent が作成できること', () => {
    expect(component).toBeTruthy();
    expect(page.title.textContent).toBe('Stream Music');
    expect(page.description.textContent).toBe('Web 上の音楽を Google Home でストリーム再生');
  });
});

class Page {
  title: HTMLElement;
  description: HTMLElement;

  addPageElements() {
    this.title = fixture.debugElement.query(By.css('h3')).nativeElement;
    this.description = fixture.debugElement.query(By.css('p')).nativeElement;
  }
}

function createComponent() {
  fixture = TestBed.createComponent(StreamComponent);
  component = fixture.componentInstance;

  page = new Page();

  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    page.addPageElements();
  });
}
