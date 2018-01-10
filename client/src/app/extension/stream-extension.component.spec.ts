import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamExtensionComponent } from './stream-extension.component';

describe('StreamExtensionComponent', () => {
  let component: StreamExtensionComponent;
  let fixture: ComponentFixture<StreamExtensionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamExtensionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
