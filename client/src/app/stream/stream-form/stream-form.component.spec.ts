import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { StreamFormComponent } from './stream-form.component';
import { MessageService } from '../../model/message.service';

describe('StreamFormComponent', () => {
  let component: StreamFormComponent;
  let fixture: ComponentFixture<StreamFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StreamFormComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        SharedModule,
      ],
      providers: [
        MessageService,
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
