import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { StreamFormComponent } from './stream-form.component';

describe('StreamFormComponent', () => {
  let component: StreamFormComponent;
  let fixture: ComponentFixture<StreamFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StreamFormComponent],
      imports: [
        HttpClientModule,
        FormsModule,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
