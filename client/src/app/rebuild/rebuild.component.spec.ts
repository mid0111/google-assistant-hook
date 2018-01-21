import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RebuildComponent } from './rebuild.component';

describe('RebuildComponent', () => {
  let component: RebuildComponent;
  let fixture: ComponentFixture<RebuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RebuildComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RebuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
