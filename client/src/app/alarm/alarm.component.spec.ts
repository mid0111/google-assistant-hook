import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlarmComponent } from './alarm.component';
import { SharedModule } from '../shared/shared.module';
import { AlarmFormComponent } from './alarm-form/alarm-form.component';

describe('AlarmComponent', () => {
  let component: AlarmComponent;
  let fixture: ComponentFixture<AlarmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AlarmComponent,
        AlarmFormComponent,
      ],
      imports: [SharedModule],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
