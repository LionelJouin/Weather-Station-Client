import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensorCreateDialogComponent } from './sensor-create-dialog.component';

describe('SensorCreateDialogComponent', () => {
  let component: SensorCreateDialogComponent;
  let fixture: ComponentFixture<SensorCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensorCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensorCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
