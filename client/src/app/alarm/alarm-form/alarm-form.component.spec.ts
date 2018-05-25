import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmFormComponent } from './alarm-form.component';
import { SharedModule } from '../../shared/shared.module';

describe('AlarmFormComponent', () => {
  let component: AlarmFormComponent;
  let fixture: ComponentFixture<AlarmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [AlarmFormComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
